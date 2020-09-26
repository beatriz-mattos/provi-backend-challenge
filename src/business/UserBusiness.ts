import { InvalidParameterError } from "../error/InvalidParameterError";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { ConflictError } from '../error/ConflictError';
import { RegisterInputDTO, UserRegister } from "../models/UserRegister";
import { UserDatabase } from "../data/UserDatabase";
import { CpfInputDTO } from "../models/UserCpf";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
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

        const checkDuplicateEntry = await this.userDatabase.getUserByEmail(email);

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

    public async addCpf(input: CpfInputDTO) {
        const { token, cpf } = input;

        if (!token || !cpf) {
            throw new InvalidParameterError("Missing some input")
        };

        //TO DO: inserir validação do cpf (isCpfValid)
    
        const cpfChecker = await this.userDatabase.findUserByCpf(cpf);

        if(cpfChecker) {
            await this.userDatabase.updateCpf(cpf);
        };
    };
    
};