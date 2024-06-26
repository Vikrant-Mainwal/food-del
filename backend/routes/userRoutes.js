import express from 'express'
import { loginUser, registerUser } from '../controller/userController.js'


const userRoutes = express.Router()

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUser)


export default userRoutes