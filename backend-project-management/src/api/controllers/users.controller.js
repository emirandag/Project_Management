const User = require('../models/user.model');
const Project = require('../models/project.model');
const Task = require('../models/task.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const setError = require('../../helpers/handle-error');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');
const { generateToken } = require('../../utils/token');
const randomPassword = require('../../utils/randomPassword');
const sendMailNodemailer = require('../../utils/sendMailNodemailer')
dotenv.config();

/**
 * ---------------------- REGISTER -----------------------
 */
const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    const email = process.env.NODEMAILER_EMAIL;
    const password = process.env.NODEMAILER_PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const confirmationCode = Math.floor(
      Math.random() * (999999 - 100000) + 100000
    );

    const newUser = new User({ ...req.body, confirmationCode });

    if (req.file) {
      newUser.photo = req.file.path;
    } else {
      newUser.photo =
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg';
    }

    const userExists = await User.findOne({
      email: newUser.email,
      name: newUser.name,
    });

    if (userExists) {
      deleteImgCloudinary(catchImg);
      return next(setError(409, 'This user already exist'));
    } else {
      try {
        const createUser = await newUser.save();
        createUser.password = null;

        const mailOptions = {
          from: email,
          to: req.body.email,
          subject: 'Code confirmation',
          text: `Your code is ${confirmationCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        return res.status(201).json({
          user: createUser,
          confirmationCode: confirmationCode,
        });
      } catch (error) {
        return res.status(404).json(error.message);
      }
    }
  } catch (error) {
    deleteImgCloudinary(catchImg);
    return next(
      setError(error.code || 500, error.message || 'failed create user')
    );
  }
};


/**
 * ------------------------ CHECK NEW USER -----------------------------
 */
const checkNewUser = async (req, res, next) => {
  try {
    //traer del body el email y codigo de confirmación
    const { email, confirmationCode } = req.body
    console.log(req.body);

    //Comprovar que el usuario exista, porque si no existe no se puede hacer ninguna verificación
    const userExists = await User.findOne({ email })
    if (!userExists) {
      return res.status(404).json("User not found")
    } else {
      //Comparamos el código del body y del userExists

      if (confirmationCode === userExists.confirmationCode) {
        try {
          //Si existe cambiamos la propiedad check a true
        await userExists.updateOne({ check: true })
        //Testeamos que el usuario se haya actualizado correctamente
        const updateUser = await User.findOne({ email })

        return res.status(200).json({
          testCheckOk: updateUser.check == true ? true : false
        })
        } catch (error) {
          return res.status(404).json(error.message)
        }
        
      } else {
        try {
                  // En caso de equivocarse con el código lo borramos de la base de datos y se lo envía al registro
        await User.findByIdAndDelete(userExists._id)

        //Borramos la imagen
        deleteImgCloudinary(userExists.photo)

        return res.status(200).json({
          userExists, 
          check: false,
          delete: (await User.findUserById(userExists._id)) ? 'error delete user' : 'Ok - user deleted'
        })
        } catch (error) {
          return res.status(404).json(error.message)
        }

      }
    }
  } catch (error) {
    return next(setError(500, 'General error check code'))
  }
}

/**
 * ------------------------- RESEND CODE CONFIRMATION --------------------------------------
 */
const resendCode = async (req, res, next) => {
  try {
    //Configuramos NODEMAILER 
    // const email = process.env.NODEMAILER_EMAIL
    // const password = process.env.NODEMAILER_PASSWORD

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: email,
    //     pass: password
    //   }
    // })

    const userExists = await User.findOne({ email: req.body.email })

    if (userExists) {
      // const mailOptions = {
      //   from: email,
      //   to: req.body.email,
      //   subject: 'Confirmation code',
      //   text: `tu codigo es ${userExists.confirmationCode}`
      // }

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //     return res.status(200).json({
      //       resend: true
      //     })
      //   }
      // })

      const mailOptions = {
        userEmail: req.body.email,
        subject: 'Confirmation code',
        text: `tu codigo es ${userExists.confirmationCode}`
      }
      sendMailNodemailer(mailOptions)

      return res.status(200).json({
        resend: true
      })
    } else {
      return res.status(404).json('User not found')
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error general send code'))
  }
}


/**
 * ----------------------- LOGIN --------------------------------
 */
const login = async (req, res, next) => {
  try {
    //Recuperamos el email y password del body
    const { email, password } = req.body

    //Buscamos el usuario en la base de datos
    const user = await User.findOne({ email })

    //Comprobamos si hay o no usuario
    if (!user) {
      return res.status(404).json('User not found')
    } else {
      //Comparamos la contraseña introducida por el body y la existente en la base de datos
      if (bcrypt.compareSync(password, user.password)) {
        //Si es igual, generaos un token
        const token = generateToken(user._id, email)

        //devolvemos el usuario y el token
        return res.status(200).json({
          user,
          token
        })
      } else {
        
        return res.status(404).json('Password invalid')
      }      
    }
  } catch (error) {
    return next(
    setError(500 || error.code, 'General error login' || error.message)
    )
  }
}



const autoLogin = async (req, res, next) => {
  try {
    // Recuperamos el email y password del body
    const { email, password } = req.body

    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ email })

    // Comprobamos si hay o no usuario
    if (!user) {
      return res.status(404).json('User not found')
    } else {
      // Comparamos la contraseña introducida por el body y la existente en la base de datos
      const passwordMatch = await bcrypt.compare(password, user.password)

      if (passwordMatch) {
        // Si es igual, generamos un token
        const token = generateToken(user._id, email)

        // Devolvemos el usuario y el token
        return res.status(200).json({
          user,
          token
        })
      } else {
        return res.status(404).json('Invalid password')
      }      
    }
  } catch (error) {
    return next(setError(500 || error.code, 'General error login' || error.message))
  }
}


/**
 * -------------------- RESET DE CONTRASEÑA ANTES DEL LOGIN
 */
const forgotPassword = async (req, res, next) => {
  try {
    // Recuperamos el email del body
    const { email } = req.body;
    console.log(req.body);

    //Verificamos si el usuario está registrado en la base de datos
    const userDb = await User.findOne({ email });
    if (userDb) {
      //si el usuario existe hacemos redirect al otro controlador
      return res.redirect(307, `http://localhost:8080/api/v1/users/forgotpassword/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json('User not register');
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    // Recibimos el ID por parámetro
    const { id } = req.params;
    console.log(req.params);
    const userDb = await User.findById(id);

    //Configuramos el envío del correo electrónico
    const email = process.env.NODEMAILER_EMAIL;
    const password = process.env.NODEMAILER_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    //generamos una contraseña random
    let passwordSecure = randomPassword();

    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: '-----',
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };

    //enviamos el correo y dentro de envío gestionamos el guardado de la nueva contraseña
    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        console.log(error);

        return res.status(404).json("Don't sent email and don't upsate user");
      } else {
        //encriptamos la contraseña que se ha generado arriba
        const newPasswordHash = bcrypt.hashSync(passwordSecure, 10);

        try {
          //Una vez hasheada la contraseña la actualizamos en la base de datos
          await User.findByIdAndUpdate(id, { password: newPasswordHash });

          //Testeamos que se ha hecho correctamente
          const updateUser = await User.findById(id);

          if (bcrypt.compareSync(passwordSecure, updateUser.password)) {
            res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            // Si no son iguales, enviamos al front que el usuario no se ha actualizado
            // aunque si ha recibido un correo con la contraseña que no es válida
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * ------------------------- Cambio de contraseña estando logueado ----------------------------------------------
 */
const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

    const { _id } = req.user;

    if (bcrypt.compareSync(password, req.user.password)) {
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);

      try {
        await User.findByIdAndUpdate(_id, { password: newPasswordHash });

        const updateUser = await User.findById(_id);

        if (bcrypt.compareSync(newPassword, updateUser.password)) {
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json('password not match');
    }
  } catch (error) {
    return next(error);
  }
};


/**
 * ----------------------------- UPDATE USER ---------------------------------
 */
const update = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    // actualizamos los indexes de los elementos unicos por si han modificado
    await User.syncIndexes();

    //Instanciamos un nuevo modelo de usuario
    const patchUser = new User(req.body);

    // si tenemos el file le metemos el path de cloudinary
    if (req.file) {
      patchUser.photo = req.file.path;
    }

    // estas cosas no quiero que me cambien por lo cual lo cojo del req.user gracias a que esto es con auth
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.check = req.user.check;
    patchUser.email = req.user.email;
    patchUser.projects = req.user.projects;
    patchUser.tasks = req.user.tasks;

    try {
      // Actualizamos en la base de datos con el ID
      await User.findByIdAndUpdate(req.user._id, patchUser);

      // Borramos en Cloudinary la imagen antigua
      if (req.file) {
        deleteImgCloudinary(req.user.photo);
      }

      // Hacemos test en runtime
      // Buscamos el usuario actualizado
      const updateUser = await User.findById(req.user._id);

      // Cogemos las keys del body
      const updateKeys = Object.keys(req.body);

      //Guardamos los test en una variable
      const testUpdate = [];

      updateKeys.forEach((item) => {
        if (updateUser[item] == req.body[item]) {
          testUpdate.push({
            [item]: true,
          });
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      if (req.file) {
        updateUser.photo == req.file.path
          ? testUpdate.push({ file: true })
          : testUpdate.push({ file: false });
      }

      return res.status(200).json({
        testUpdate,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    deleteImgCloudinary(catchImg);
    return next(error);
  }
};


/**
 * ------------------------------ DELETE USER ---------------------------------
 */
const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    try {
      await User.findByIdAndDelete(_id);

      try {
        await Project.updateMany({ users: _id }, { $pull: { users: _id } });

        try {
          await Task.updateMany(
            { assignedTo: _id },
            { $unset: { assignedTo: 1 } }
          );

          if (await User.findById(_id)) {
            return res.status(404).json("Don't delete");
          } else {
            deleteImgCloudinary(req.user.photo);
            return res.status(200).json('Ok delete');
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(error);
  }
};


/**
 * ----------------------------------- ADD USER TO PROJECT --------------------------------------
 */
const addUserProject = async(req, res, next) => {
  try {
    const { id } = req.params
    const { projectId } = req.body

    const findUser = await User.findById(id).populate("projects")
    const isOpenProject = await Project.findOne({ _id: projectId, isClosed: false})

    if (!isOpenProject) {
      return res.status(404).json("There isn't open project.")
    } else {
      if (!isOpenProject.users.includes(findUser._id)) {
        try {
          //Pusheamos el ID del proyecto en el array de proyectos en el usuario
          //Pusheamos el ID del usuario en el array de usuarios en Projectos
          await Project.findByIdAndUpdate(projectId, { $push: { users: id } })

          const testProject = await Project.findById(projectId).populate("users")

          if (testProject) {
            
            try {
              await User.findByIdAndUpdate(id, { $push: { projects: projectId } })
              const testUser = await User.findById(id).populate("projects")

              if (testUser) {
                return res.status(201).json(
                  {
                    testUser,
                    testProject,
                    results: `Added '${testUser.email}' in the project '${testProject.title}'`
                  }
                )
              } 
            } catch (error) {
              return res.status(404).json("Error add project in user")
            }
          }
          
          
        } catch (error) {
          return res.status(404).json("Error add user in project")
        }
      } else {
          return res.status(404).json("User exist in project")
      }
    }

  } catch (error) {
    return next(error)
  }
}

/**
 * ------------------------------ ADD USER TO TASK --------------------------------------
 */
const addUserTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const { taskId } = req.body

    const foundUser = await User.findById(id)
    const foundTask = await Task.findById({ _id: taskId})


    if (!foundTask) { // Validamos si la tarea existe
      return res.status(404).json("The task not exist")
    } else if (foundTask.isCompleted == true) { // Validamos si la tarea está completada
      return res.status(404).json("The task is not open")
    } else if (foundTask.assignedTo) { // Comprobamos si la tarea ya está asignada a un usuario
      return res.status(404).json("There is already a user in this task")
    } else {
      if (!foundUser) { // Validamos si el usuario existe o no
        return res.status(404).json("The user not exist")
      } else if (!foundUser.projects.includes(foundTask.project)) { // Comprobamos si el usuario está dentro de los usuarios del proyecto asociado a la tarea.
        return res.status(404).json("The user is not in the project associated with the task")
      } else {
        try {
          foundTask.assignedTo = foundUser._id
          await foundTask.save()
          await User.findByIdAndUpdate(foundUser._id, { $push: { tasks: foundTask._id } })
          try {
            const testUser = await User.findById(foundUser._id).populate("tasks")
            const testUserTask = testUser.tasks.some(task => task._id == taskId)

              if (testUserTask) {
            
                return res.status(200).json(
                  {
                    testUser,
                    results: `Added user '${testUser.email}' in the task '${foundTask.title}'`
                  }
                )
            }
          } catch (error) {
            return "Error al buscar el usuario"
          }
        } catch (error) {
          return next(error)
        }
      } 
    }
  } catch (error) {
    return next(error)
  }
}


/**
 * -------------------------- GET ALL USERS -----------------------------
 */
const getAllUsers = async (req, res, next) => {
  try {
    const getUsers = await User.find().populate("tasks")

    if (getUsers) {
      res.status(200).json(getUsers)
    } else {
      res.status(404).json('Error not found the users')
    }
  } catch (error) {
    return next(setError(error.code || 500, error.message || 'Failed to list all users'));
  }
}



/**
 * -------------------------- GET USER BY ID -----------------------------
 */
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const getUserById = await User.findById(id).populate("tasks")

    if (getUserById) {
      res.status(200).json(getUserById)
    } else {
      res.status(404).json('Error the project not exist')
    }
  } catch (error) {
    return next(setError(error.code || 500, error.message || 'Failed to list project'));
  }
}



/**
 * ---------------------------- CHANGE EMAIL --------------------------------
 */
// const changeEmail = async (req, res, next) => {
//   try {
//     // Traemos el ID de los params
//     const { id } = req.params

//     // Nos traemos el email del body
//     const { email, newEmail } = req.body
//     console.log(req.body);
//     // Traemos el usuario correspondiente al usuario
//     const foundUser = await User.findOne({ _id: id }, { email })
//     console.log(foundUser);
//     if (!foundUser) {
//       return res.status(404).json('The email is not correct')
//     } else {
//       try {
//         await User.findByIdAndUpdate(id, { email: newEmail })

//         const updateEmailUser = await User.findById(id)

//         if (updateEmailUser.email == newEmail) {
//           try {

//             const mailOptions = {
//               userEmail: updateEmailUser.email,
//               subject: 'Code confirmation',
//               text: `Your code is ${updateEmailUser.confirmationCode}`,
//             }
//             sendMailNodemailer(mailOptions)

//             //await updateEmailUser.updateOne({ check: false })
//             const testUpdateUserEmail = await User.findOne({ email: updateEmailUser.email }) 

//             if (testUpdateUserEmail) {
//               res.status(200).json(
//                 {
//                   testUpdateUserEmail,
//                   confirmationCode: updateEmailUser.confirmationCode,
//                   result: 'The email the user is updated'
//                 }
//               )
//             }
//           } catch (error) {
//             es.status(404).json("Error to sent the email")     
//           }
//         } else {
//           res.status(404).json("The email is not updated")        
//         }
//       } catch (error) {
//         return next(setError(error.code || 500, error.message || 'Error to update the email'));
//       }
      
//     }
    
//   } catch (error) {
//     return next(setError(error.code || 500, error.message || 'General error to change email'));
//   }
// }

/**
 * ---------------------------------- CHANGE EMAIL ----------------------------------------
 */
const changeEmail = async (req, res, next) => {
  try {
    // Traemos el ID de los params
    const { _id } = req.user

    // Nos traemos el email del body
    const { email, newEmail } = req.body;

    // Traemos el usuario correspondiente al usuario
    const foundUser = await User.findById(_id);
    //console.log(foundUser);
    if (foundUser.email != email) {
      return res.status(404).json('The email is not correct');
    } else {

      const newCode = Math.floor(
        Math.random() * (999999 - 100000) + 100000
      );

      try {

        await foundUser.updateOne({ confirmationCode: newCode })

        const updateUserCode = await User.findById(_id)

        if (updateUserCode.confirmationCode == newCode) {
          const mailOptions = {
            userEmail: newEmail,
            subject: 'Code confirmation from change email address',
            text: `Your code is ${newCode}`,
          };
          sendMailNodemailer(mailOptions);

          res.status(200).json({
            updateUserCode,
            confirmationCode: newCode,
            message: `The confirmation code has been sent to the email ${newEmail}`
          })
        } else {
          res.status(404).json("The code not has been updated")
        }   
      } catch (error) {
        return next(
          setError(
            error.code || 500,
            error.message || 'General error to update confirmation code'
          )
        );
      }
    }
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'General error to sent code to email'
      )
    );
  }
}; 


/**
 * ---------------------------- CHECK NEW EMAIL -------------------------------
 */
const checkNewEmail = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { newEmail, confirmationCode } = req.body

    const foundUser = await User.findById(_id )

    if (foundUser.confirmationCode != confirmationCode) {
      return res.status(404).json('The confirmation code is not correct')
    } else {
      try {
        await foundUser.updateOne({ email: newEmail })

        const testUpdateEmailUser = await User.findById(_id)

        if (testUpdateEmailUser.email == newEmail) {
          return res.status(200).json({
            testUpdateEmailUser,
            newEmail,
            message: `The email has been updated to ${testUpdateEmailUser.email}`
          })
        } else {
          return res.status(404).json('The email is not updated')
        }
      } catch (error) {
        return next(
          setError(
            error.code || 500,
            error.message || 'Error to change email'
          )
        );
      }
    }
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'General error to check email'
      )
    );
  }
}


module.exports = { 
  register, 
  checkNewUser, 
  resendCode, 
  login, 
  autoLogin,
  forgotPassword, 
  sendPassword, 
  modifyPassword, 
  update, 
  deleteUser, 
  addUserProject, 
  addUserTask,
  getAllUsers,
  getUser,
  changeEmail,
  checkNewEmail
};
