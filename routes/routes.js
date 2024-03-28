import Controller from "../controllers/controller.js";

import express from "express";

import isValidUser from "../middlewares/validate.js";

const router = express.Router()

router.get('/login', Controller.login_get)

router.get('/dashboard',isValidUser, Controller.dashboard_get)

router.post('/logout',Controller.logout_post)

router.get('/home', Controller.home_get)

router.get('/signup', Controller.signup_get)

router.post('/signup', Controller.signup_post)

router.post('/login', Controller.login_post)
 

export default router