const express = require('express');
const basicRoute = express.Router();
const { login, signUp, deleteAccount, logout } = require('../controllers/basicController')

//GET: login
basicRoute.get("/login", login);

//POST: signup
basicRoute.post("/signup", signUp);

//DELETE: delete account
basicRoute.delete("/deleteAccount/:id_role/:id", deleteAccount);

//POST: logout
basicRoute.post("logout/", logout);

module.exports = basicRoute;