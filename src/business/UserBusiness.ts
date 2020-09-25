import { User, RegisterInputDTO } from './../model/User';
import { InvalidParameterError } from "../error/InvalidParameterError";
import { NotFoundError } from './../error/NotFoundError';
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { ConflictError } from '../error/ConflictError';

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
        if(checkDuplicateEntry) {
            throw new ConflictError("This user has already been registered");
        };

        const id = this.idGenerator.generate();
        const cryptedPassword = await this.hashManager.hash(password);

        await this.userDatabase.createUser(
            new User(id, email, cryptedPassword)
        );

        const token = this.authenticator.generateToken({ id });

        return { token };
    };

    // public async login(input: SignupAndLoginInputDTO) {
    //     const { email, password } = input;

    //     if (!email || !password) {
    //         throw new InvalidParameterError("Missing some input")
    //     };

    //     const user = await this.userDatabase.getUserByEmail(email);

    //     if (!user) {
    //         throw new NotFoundError("User not found")
    //     };

    //     const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword());

    //     if (!isPasswordCorrect) {
    //         throw new InvalidParameterError("Invalid password")
    //     };

    //     const token = this.authenticator.generateToken({ id: user.getId() });

    //     return { token };
    // };
};