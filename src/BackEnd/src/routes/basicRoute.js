const express = require('express');
const basicRoute = express.Router();
const { verifyToken } = require("../middlewares/baseToken");
const { login, signUp, deleteAccount, logout, getDestination } = require('../controllers/basicController')

//GET: login
basicRoute.get("/login", login);

//POST: signup
basicRoute.post("/signup", signUp);

//DELETE: delete account
basicRoute.delete("/deleteAccount/:id_role/:id", verifyToken, deleteAccount);

//POST: logout
basicRoute.post("logout/", verifyToken, logout);

//GET: get destination
basicRoute.get("/destination", getDestination);

module.exports = basicRoute;