const Project = require("../models/project.model")
const Task = require("../models/task.model")
const setError = require('../../helpers/handle-error');
const User = require("../models/user.model");

/**
 * ----------------------- CREATE PROJECT -----------------------
 */
const createProject = async (req, res, next) => {
    try {
        await Project.syncIndexes();
        
        //Extraemos los datos del proyecto del body
        const newProject = req.body

        //Creamos un nuevo proyecto instanciando el modelo Project
        const postProject = new Project(newProject)

        try {
          const savedProject = await postProject.save()

          if (savedProject) {
              return res.status(201).json(savedProject)
          } else {
              return res.status(404).json('Error create Project')
          }
        } catch (error) {
          return res.status(404).json(error.message)
        }

    } catch (error) {
        return next(
            setError(error.code || 500, error.message || 'Failed to create project')
          );
    }
}


/**
 * ----------------------------- UPDATE PROJECT -----------------------------------------
 */
const updateProject = async (req, res, next) => {
  try {
    await Project.syncIndexes();
    //Recuperamos el ID que ponemos por parámetro
    const { id } = req.params;

    const updateProjectById = await Project.findById(id).populate('tasks');

    // Filtramos por las tareas que todavía no se encuentran completadas
    const openTasksInProject = updateProjectById.tasks.filter(
      (task) => !task.isCompleted
    );

    // Comprobamos si hay tareas abiertas
    if (openTasksInProject.length > 0) {
      // Hacemos un map y buscamos el título de las tareas.
      const openTaskTitles = openTasksInProject.map((task) => task.title);

      // Con el .join unimos las tareas en caso de que hubiera más de una abierta.
      return res
        .status(404)
        .json(
          `Error - In the project, there are still open tasks: ${openTaskTitles.join(
            ', '
          )}.`
        );
    } else {
      try {
        // Buscamos por ID el proyecto y cambiamos el estado del proyecto a cerrado.
        await Project.findByIdAndUpdate(id, { isClosed: true });

        // Hacemos un test y comprobamos si el proyecto ya está cerrado
        const testUpdateProject = await Project.findById(id).populate('tasks');

        if (testUpdateProject) {
          return res.status(200).json({
            testUpdateProject,
            result: `Updated project. The project '${testUpdateProject.title}' is closed.`,
          });
        } else {
          return res.status(404).json(error.message);
        }
      } catch (error) {
        return res.status(404).json('Error update project"');
      }
    }
  } catch (error) {
    return next(
      setError(error.code || 500, error.message || 'Failed to update project')
    );
  }
};



/**
 * ------------------------------ DELETE PROJECT -----------------------------------------
 */
const deleteProject = async (req, res, next) => {
    try {
        //Recuperamos el ID que ponemos por parámetro
        const { id } = req.params

        try {
          await Project.findByIdAndDelete(id)
        } catch (error) {
          return res.status(404).json(error.message)
        }
        

        try {
          // Borramos todas las tareas asociadas a ese proyecto, porque no pueden haber tareas sin proyecto asignado
          await Task.deleteMany({ project: id })
        } catch (error) {
          return res.status(404).json(error.message)
        }
        
        try {
          // Actualizamos todos los usuarios que tengan asignado el proyecto y borramos el proyecto de estos usuarios
          await User.updateMany({ projects: id }, { $pull: { projects: id } })
        } catch (error) {
          return res.status(404).json(error.message)
        }
        
        const isDeletedProject = await Project.findById(id) 
        if (!isDeletedProject) {
            res.status(200).json("The project was deleted")
        } else {
            res.status(404).json('Error delete project')
        }
    } catch (error) {
        return next(setError(error.code || 500, error.message || 'General error to delete project'));
    }
}



/**
 * ------------------------------ ADD MEMBERS IN PROJECT -----------------------------
 */
const addMemberProject = async (req, res, next) => {
  try {
    const projectId = req.params.id
    const { email } = req.body

    // console.log(projectId);
    // console.log(email);

    const foundProject = await Project.findById(projectId)
    const foundUser = await User.findOne({ email })

    // console.log(foundProject);
    // console.log(foundUser);


    if (foundUser) {
      if (!foundProject.users.includes(foundUser._id)) {
        try {
          await Project.findByIdAndUpdate(projectId, { $push: { users: foundUser._id } })
          
          try {
            await User.findByIdAndUpdate(foundUser._id , { $push: { projects: foundProject._id } })
            const testProject = await Project.findById(projectId).populate("users")

            const userUpdated = testProject.users.map(user => user._id)

            if (userUpdated.toString().includes(foundUser._id.toString())) {
         
              return res.status(200).json({
                userUpdated,
                results: `Added '${userUpdated.email}' in the project '${testProject.title}'`
              })
            } else {
              return res.status(404).json("The member is not add to the project")
            }

          } catch (error) {
            return res.status(404).json(error.message)
          }
        } catch (error) {
          return res.status(404).json(error.message)
        }
      } else {
        return res.status(404).json("This user already in project")
      }
      
      
    } else {
      return res.status(404).json("This email not exist")
    }

  } catch (error) {
    return next(setError(error.code || 500, error.message || 'General error to add member'));
  }
}



/**
 * -------------------------- GET ALL PROJECTS -----------------------------
 */
const getAllProjects = async (req, res, next) => {
  try {
    const getProjects = await Project.find().populate("tasks")

    if (getProjects) {
      res.status(200).json(getProjects)
    } else {
      res.status(404).json('Error not found the projects')
    }
  } catch (error) {
    return next(setError(error.code || 500, error.message || 'General error to list all projects'));
  }
}


/**
 * -------------------------- GET PROJECT BY ID -----------------------------
 */
const getProject = async (req, res, next) => {
  try {
    const { id } = req.params
    const getProjectById = await Project.findById(id).populate("users").populate("tasks")

    if (getProjectById) {
      res.status(200).json(getProjectById)
    } else {
      res.status(404).json('Error the project not exist')
    }
  } catch (error) {
    return next(setError(error.code || 500, error.message || 'General error to list project'));
  }
}

/**
 * -------------------------- GET OPEN PROJECTS -----------------------------
 */
const getOpenProjects = async (req, res, next) => {
  try {
    const openProjects = await Project.find({ isClosed: false })

    if (openProjects) {
      res.status(200).json(openProjects)
    } else {
      res.status(404).json('There arent open projects')
    }
  } catch (error) {
    return next(setError(error.code || 500, error.message || 'General error to list open projects'));
  }
}

module.exports = { 
  createProject, 
  updateProject, 
  deleteProject,
  addMemberProject, 
  getAllProjects, 
  getProject, 
  getOpenProjects 
}