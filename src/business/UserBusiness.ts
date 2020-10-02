import { AmountRequested } from './../models/AmountRequested';
import { CepAPI } from './../services/CepAPI';
import { AddressInputDTO, UserAddress } from './../models/UserAddress';
import { PhoneInputDTO, UserPhone } from './../models/UserPhone';
import { BirthdayInputDTO, UserBirthday } from './../models/UserBirthday';
import { NameInputDTO, UserName } from './../models/UserName';
import { UserCpf } from './../models/UserCpf';
import { InvalidParameterError } from "../error/InvalidParameterError";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { ConflictError } from '../error/ConflictError';
import { RegisterInputDTO, UserRegister } from "../models/UserRegister";
import { UserDatabase } from "../data/UserDatabase";
import { CpfInputDTO } from "../models/UserCpf";
import { NotFoundError } from "../error/NotFoundError";
import { validate } from 'gerador-validador-cpf';
import { GenericError } from '../error/GenericError';
import { AmountRequestedDTO } from '../models/AmountRequested';

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private CepAPI: CepAPI
    ) {};

    public async register(input: RegisterInputDTO) {

        const { email, password } = input;

        if (!email || !password) {
            throw new InvalidParameterError("Missing some input")
        };

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email")
        };

        if (input.password.length < 8) {
            throw new InvalidParameterError("Your password must contain at least 8 characters")
        };

        const checkDuplicateEntry = await this.userDatabase.findUserByEmail(email);

        if (checkDuplicateEntry) {
            throw new ConflictError("This user has already been registered");
        };

        const id = this.idGenerator.generate();

        const cryptedPassword = await this.hashManager.hash(password);

        await this.userDatabase.createUser(
            new UserRegister(id, email, cryptedPassword)
        );

        const token = this.authenticator.generateToken({ id });

        return { token };

    };

    public async login(input: RegisterInputDTO) {
        const { email, password } = input;

        if (!email || !password) {
            throw new InvalidParameterError("Missing some input")
        };

        const user = await this.userDatabase.findUserByEmail(email);

        if (!user) {
            throw new NotFoundError("User not found")
        };

        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword());

        if (!isPasswordCorrect) {
            throw new InvalidParameterError("Invalid password")
        };

        const token = this.authenticator.generateToken({ id: user.getId() });

        return { token };
    };

    public async addCpf(input: CpfInputDTO) {
        const { token, cpf } = input;

        if (!token || !cpf) {
            throw new InvalidParameterError("Missing some input")
        };

        if (!validate(cpf)) {
            throw new GenericError("Invalid CPF")
        };

        const id = this.idGenerator.generate();
        const userId = this.authenticator.getData(token);
        const cpfChecker = await this.userDatabase.findUserByCpf(cpf);

        if (!cpfChecker) {
            const user = new UserCpf(id, cpf, userId.id);
            user.setCpf(cpf);

            await this.userDatabase.addCpf(user);
        }
        else {
            await this.userDatabase.updateCpf(cpf);
        };
    };

    public async addFullName(input: NameInputDTO) {
        const { token, full_name } = input;

        if (!token || !full_name) {
            throw new InvalidParameterError("Missing some input")
        };

        const id = this.idGenerator.generate();
        const userId = this.authenticator.getData(token);

        const fullName = full_name.split(" ");
        const firstName = fullName[0];
        const lastName = fullName[fullName.length - 1];
        const newName = new UserName(id, firstName, lastName, userId.id);
        const fullNameChecker = await this.userDatabase.findUserByFullName(newName);

        if (!fullNameChecker) {
            await this.userDatabase.addFullName(newName);
        }
        else {
            await this.userDatabase.updateFullName(newName, userId.id);
        }
    };

    public async addBirthDate(input: BirthdayInputDTO) {
        const { token, birth_date } = input;

        if (!token || !birth_date) {
            throw new InvalidParameterError("Missing some input")
        };

        const id = this.idGenerator.generate();
        const userId = this.authenticator.getData(token);
        const birthChecker = await this.userDatabase.findUserByBirthDate(birth_date);

        if (!birthChecker) {
            const user = new UserBirthday(id, birth_date, userId.id);
            user.setBirthDate(birth_date);

            await this.userDatabase.addBirthDate(user);
        }
        else {
            await this.userDatabase.updateBirthDate(birth_date);
        };
    };

    public async addPhoneNumber(input: PhoneInputDTO) {
        const { token, phone_number } = input;

        if (!token || !phone_number) {
            throw new InvalidParameterError("Missing some input")
        };

        const id = this.idGenerator.generate();
        const userId = this.authenticator.getData(token);
        const phoneChecker = await this.userDatabase.findUserByPhoneNumber(phone_number);

        if (!phoneChecker) {
            const user = new UserPhone(id, phone_number, userId.id);
            user.setPhoneNumber(phone_number);

            await this.userDatabase.addPhoneNumber(user);
        }
        else {
            await this.userDatabase.updatePhoneNumber(phone_number);
        };
    };

    public async addAddress(input: AddressInputDTO) {
        const { token, cep, street, number, complement, city, state } = input;

        if (!token || !cep || !street || !number || !complement || !city || !state) {
            throw new InvalidParameterError("Missing some input")
        };

        const id = this.idGenerator.generate();
        const userId = this.authenticator.getData(token);
        const newAddress = new UserAddress(id, cep, street, number, complement, city, state, userId.id);
        const response = await this.CepAPI.cepChecker(newAddress.getCep());
        const addressChecker = await this.userDatabase.findUserByAddress(newAddress);

        if (cep.length < 8) {
            throw new GenericError("Invalid CEP")
        };

        if (response.erro) {
            throw new NotFoundError("This CEP does not exist")
        };

        if (response.logradouro != street) {
            throw new GenericError("Invalid street")
        };

        if (isNaN(number)) {
            throw new InvalidParameterError("Invalid number")
        };

        if (response.localidade != city) {
            throw new NotFoundError("Invalid city")
        };

        if (response.uf != state) {
            throw new NotFoundError("Invalid state")
        };

        if (state.length > 2) {
            throw new GenericError("Invalid format")
        };

        if (!addressChecker) {
            await this.userDatabase.addAddress(newAddress);
        }
        else {
            await this.userDatabase.updateAddress(newAddress, userId.id);
        };
    };

    public async addAmountRequested(input: AmountRequestedDTO) {
        const { token, amount_requested } = input;

        if (!token || !amount_requested) {
            throw new InvalidParameterError("Missing some input")
        };

        if (isNaN(amount_requested)) {
            throw new InvalidParameterError("Valor solicitado inválido")
        };

        const id = this.idGenerator.generate();
        const userId = this.authenticator.getData(token);
        const newAmount = new AmountRequested(id, amount_requested, userId.id);
        const amountChecker = await this.userDatabase.findUserByAmount(newAmount);

        if (!amountChecker) {
            await this.userDatabase.addAmount(newAmount);
        }
        else {
            await this.userDatabase.updateAmount(newAmount, userId.id);
        };
    };
};