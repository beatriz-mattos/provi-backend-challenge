export class UserRegister {
    constructor(
        private id: string,
        private email: string,
        private password: string
    ) {};

    public getId = () => this.id;
    public getEmail = () => this.email;
    public getPassword = () => this.password;

    public static toUserModel(userRegister?: any): UserRegister | undefined {
        return (
            userRegister &&
            new UserRegister(
                userRegister.id,
                userRegister.email,
                userRegister.password
            )
        );
    };
};

export interface RegisterInputDTO {
    email: string,
    password: string
};