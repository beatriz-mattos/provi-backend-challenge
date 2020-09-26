export class UserRegister {
    constructor(
        private id: string,
        private email: string,
        private password: string
    ) {};

    public getId = () => this.id;
    public getEmail = () => this.email;
    public getPassword = () => this.password;

    public static toUserModel(user?: any): UserRegister | undefined {
        return (
            user &&
            new UserRegister(
                user.id,
                user.email,
                user.password
            )
        );
    };
};

export interface RegisterInputDTO {
    email: string,
    password: string
};