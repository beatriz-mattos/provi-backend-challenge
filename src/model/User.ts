export class User {
    constructor(
        private id: string,
        private email: string,
        private password: string,
        private cpf?: string,
        private full_name?: string,
        private birthday?: string,
        private phone_number?: number
        // private cep?: string,
        // private street?: string,
        // private number?: number,
        // private complement?: string,
        // private city?: string,
        // private state?: string
    ) {};

    public getId = () => this.id;
    public getEmail = () => this.email;
    public getPassword = () => this.password;
    public getCpf = () => this.cpf;
    public getFullName = () => this.full_name;
    public getBirthday = () => this.birthday;
    public getPhoneNumber = () => this.phone_number;
    // public getCep = () => this.cep;
    // public getStreet = () => this.street;
    // public getNumber = () => this.number;
    // public getComplement = () => this.complement;
    // public getCity = () => this.city;
    // public getState = () => this.state;

    public static toUserModel(user?: any): User | undefined {
        return (
            user &&
            new User(
                user.id,
                user.email,
                user.password,
                user.cpf,
                user.full_name,
                user.birthday,
                user.phone_number
                // user.cep,
                // user.street,
                // user.number,
                // user.complement,
                // user.city,
                // user.state
            )
        );
    };
};

export interface SignupInputDTO {
    email: string,
    password: string
};

export interface CpfInputDTO {
    token?: string,
    cpf: string
};

export interface FullNameInputDTO {
    token?: string;
    first_name: string,
    last_name: string
};

export interface BirthdayInputDTO {
    token?: string,
    birth_date: string
};

export interface PhoneInputDTO {
    token?: string,
    phone_number: number
};

export interface AddressInputDTO {
    token?: string,
    cep: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string
};