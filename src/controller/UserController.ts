import { RegisterInputDTO } from '../models/UserRegister';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { BaseDatabase } from '../data/BaseDatabase';
import { Request, Response } from "express";
import { UserBusiness } from '../business/UserBusiness';
import { UserDatabase } from '../data/UserDatabase';
import { CpfInputDTO } from '../models/UserCpf';

export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    );

    async register(req: Request, res: Response) {
        try {
            
            const { email, password } = req.body;
            const input: RegisterInputDTO = { email, password };
            const response = await UserController.UserBusiness.register(input);

            res.status(200).send(response);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };

    async addCpf(req: Request, res: Response) {
        try {
            
            const { token, cpf } = req.body;
            const input: CpfInputDTO = { token, cpf };
            const response = await UserController.UserBusiness.addCpf(input);

            res.status(200).send(response);
            
        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };
};