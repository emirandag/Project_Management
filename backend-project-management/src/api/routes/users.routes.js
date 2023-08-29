const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const { 
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
    getAllUsers,
    getUser,
    changeEmail,
    checkNewEmail,
    changeRol
} = require('../controllers/users.controller');
const { isAuth, isAuthManager, isAuthAdmin } = require('../../middlewares/auth.middleware');

const UserRoutes = express.Router();

UserRoutes.post('/register', upload.single('photo'), register);
UserRoutes.post('/checkuser', checkNewUser);
UserRoutes.post('/resendcode', resendCode);
UserRoutes.post('/login', login);
UserRoutes.post('/login/autologin', autoLogin);
UserRoutes.post('/forgotpassword', forgotPassword);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
UserRoutes.patch('/update/update', [isAuth], upload.single('photo'), update);
UserRoutes.delete('/', [isAuth], deleteUser);
UserRoutes.patch('/adduserproject/:id&projectId=:projectId', [isAuthManager], addUserProject);
//UserRoutes.patch('/addusertask/:id', [isAuth], addUserTask);
UserRoutes.get("/", [isAuthManager], getAllUsers)
UserRoutes.get("/:id", [isAuthManager], getUser)
UserRoutes.post("/changeemail", [isAuth], changeEmail)
UserRoutes.post("/checkemail", [isAuth], checkNewEmail)
UserRoutes.patch("/changerol", [isAuthAdmin], changeRol)

// -------REDIRECT --------------------
UserRoutes.post('/forgotpassword/sendPassword/:id', sendPassword);

module.exports = UserRoutes;
