import { UserCpf } from './../model/UserCpf';
import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/register", userController.register);
userRouter.post("/cpf", userController.addCpf);
// userRouter.post("/full-name", userController.addFullName);
// userRouter.post("/birthday", userController.addBirthDate);
// userRouter.post("/phone", userController.addPhoneNumber);
// userRouter.post("/address", userController.addAddressInfo);