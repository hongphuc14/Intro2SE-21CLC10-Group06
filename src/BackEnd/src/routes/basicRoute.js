const express = require('express');
const basicRoute = express.Router();
<<<<<<< HEAD
=======
const { verifyToken } = require("../middlewares/baseToken");
>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842
const { login, signUp, deleteAccount, logout } = require('../controllers/basicController')

//GET: login
basicRoute.get("/login", login);

//POST: signup
basicRoute.post("/signup", signUp);

//DELETE: delete account
<<<<<<< HEAD
basicRoute.delete("/deleteAccount/:id_role/:id", deleteAccount);

//POST: logout
basicRoute.post("logout/", logout);
=======
basicRoute.delete("/deleteAccount/:id_role/:id", verifyToken, deleteAccount);

//POST: logout
basicRoute.post("logout/", verifyToken, logout);
>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842

module.exports = basicRoute;