export class User {
    constructor(
        private id: string,
        private email: string,
        private password: string,
    ) {};

    public getId = () => this.id;
    public getEmail = () => this.email;
    public getPassword = () => this.password;

    public static toUserModel(user?: any): User | undefined {
        return (
            user &&
            new User(
                user.id,
                user.email,
                user.password
            )
        );
    };
};

export interface SignupAndLoginInputDTO {
    email: string,
    password: string
};