import { SignupInputDTO, CpfInputDTO } from './../model/User';
import { Authenticator } from '../services/Authenticator';
import { UserBusiness } from './../business/UserBusiness';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from './../services/IdGenerator';
import { UserDatabase } from './../data/UserDatabase';
import { BaseDatabase } from './../data/BaseDatabase';
import { Request, Response } from "express";

export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    );

    async signup(req: Request, res: Response) {
        try {
            const input: SignupInputDTO = {
                email: req.body.email,
                password: req.body.password
            };
            
            const response = await UserController.UserBusiness.signup(input);

            res.status(200).send(response);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };

    // async login(req: Request, res: Response) {
    //     try {
    //         const { email, password } = req.body;

    //         const input: SignupAndLoginInputDTO = { email, password };

    //         const token = await UserController.UserBusiness.login(input);

    //         res.status(200).send(token);

    //     } catch (err) {
    //         res.status(err.code || 400).send({ message: err.message })
    //     };

    //     await BaseDatabase.destroyConnection();
    // };

    async addCpf(req: Request, res: Response) {
        try {
            const { token, cpf } = req.body;

            const input: CpfInputDTO = { token, cpf };

            
        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };
};