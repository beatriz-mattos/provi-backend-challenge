import { RegisterInputDTO } from '../model/UserRegister';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { BaseDatabase } from '../data/BaseDatabase';
import { Request, Response } from "express";
import { UserRegisterBusiness } from '../business/UserRegisterBusiness';
import { UserRegisterDatabase } from '../data/UserRegisterDatabase';

export class UserRegisterController {
    private static UserRegisterBusiness = new UserRegisterBusiness(
        new UserRegisterDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    );

    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const input: RegisterInputDTO = { email, password };
            
            const response = await UserRegisterController.UserRegisterBusiness.register(input);

            res.status(200).send(response);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };
};