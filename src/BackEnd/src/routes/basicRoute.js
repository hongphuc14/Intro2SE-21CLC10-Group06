const express = require('express');
const basicRoute = express.Router();
const { login, signUp } = require('../controllers/basicController')

//GET: login
basicRoute.get("/login", login);

//POST: signup
basicRoute.post("/signup", signUp);

module.exports = basicRoute;