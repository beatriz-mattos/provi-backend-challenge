import { AddressInputDTO } from './../models/UserAddress';
import { PhoneInputDTO } from './../models/UserPhone';
import { BirthdayInputDTO } from './../models/UserBirthday';
import { RegisterInputDTO } from '../models/UserRegister';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { BaseDatabase } from '../data/BaseDatabase';
import { Request, Response } from "express";
import { UserBusiness } from '../business/UserBusiness';
import { UserDatabase } from '../data/UserDatabase';
import { CpfInputDTO } from '../models/UserCpf';
import { NameInputDTO } from '../models/UserName';
import { CepAPI } from '../services/CepAPI';
import { AmountRequestedDTO } from '../models/UserAmountRequested';

export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator(),
        new CepAPI()
    );

    async register(req: Request, res: Response) {
        try {

            const { email, password } = req.body;
            const input: RegisterInputDTO = { email, password };
            const response = await UserController.UserBusiness.register(input);

            res.status(200).send(response);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

    async login(req: Request, res: Response) {
        try {

            const { email, password } = req.body;
            const input: RegisterInputDTO = { email, password };
            const token = await UserController.UserBusiness.login(input);

            res.status(200).send(token);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

    async addCpf(req: Request, res: Response) {
        try {

            const { token, cpf } = req.body;
            const input: CpfInputDTO = { token, cpf };
            const response = await UserController.UserBusiness.addCpf(input);

            res.status(200).send({ response, "Success": true, "next-end-point": "full-name" });

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

    async addFullName(req: Request, res: Response) {
        try {

            const { token, full_name } = req.body;
            const input: NameInputDTO = { token, full_name };
            const response = await UserController.UserBusiness.addFullName(input);

            res.status(200).send({ response, "Success": true, "next-end-point": "birthday" });

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

    async addBirthDate(req: Request, res: Response) {
        try {

            const { token, birth_date } = req.body;
            const input: BirthdayInputDTO = { token, birth_date };
            const response = await UserController.UserBusiness.addBirthDate(input);

            res.status(200).send({ response, "Success": true, "next-end-point": "phone" });

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

    async addPhoneNumber(req: Request, res: Response) {
        try {

            const { token, phone_number } = req.body;
            const input: PhoneInputDTO = { token, phone_number };
            const response = await UserController.UserBusiness.addPhoneNumber(input);

            res.status(200).send({ response, "Success": true, "next-end-point": "address" });

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

    async addAddress(req: Request, res: Response) {
        try {

            const { token, cep, street, number, complement, city, state } = req.body;
            const input: AddressInputDTO = { token, cep, street, number, complement, city, state };
            const response = await UserController.UserBusiness.addAddress(input);

            res.status(200).send({ response, "Success": true, "next-end-point": "amount-requested" });

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

    async addAmountRequested(req: Request, res: Response) {
        try {

            const { token, amount_requested } = req.body;
            const input: AmountRequestedDTO = { token, amount_requested };
            const response = await UserController.UserBusiness.addAmountRequested(input);

            res.status(200).send({ response, "Success": true, "next-end-point": "next" });

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message });
        } finally {
            await BaseDatabase.destroyConnection();
        };
    };

};