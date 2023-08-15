const express = require('express');
const basicRoute = express.Router();
const { verifyToken } = require("../middlewares/baseToken");
const { login, signUp, deleteAccount, getDestination, getInfoByEmail } = require('../controllers/basicController');

//GET: login
basicRoute.post("/login", login);

//POST: signup
basicRoute.post("/signup", signUp);

//DELETE: delete account
basicRoute.delete("/deleteAccount/:id_role/:id", verifyToken, deleteAccount);

//GET: get destination
basicRoute.get("/destination", getDestination);

//GET: get admin info by email
basicRoute.get("/getInfo/:email", verifyToken, getInfoByEmail);

module.exports = basicRoute;