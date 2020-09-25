import express from "express";
import { UserRegisterController } from "../controller/UserRegisterController";

export const userRouter = express.Router();

const userRegisterController = new UserRegisterController();

userRouter.post("/register", userRegisterController.register);
//userRouter.post("/cpf", cpfController.addCpf);
// userRouter.post("/full-name", userController.addFullName);
// userRouter.post("/birthday", userController.addBirthDate);
// userRouter.post("/phone", userController.addPhoneNumber);
// userRouter.post("/address", userController.addAddressInfo);