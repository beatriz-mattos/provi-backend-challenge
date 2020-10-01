export class UserCpf {
    constructor(
        private id: string,
        private cpf: string,
        private user_id: string
    ) {};

    public getId = () => this.id;
    public getCpf = () => this.cpf;
    public getUserId = () => this.user_id;

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    };

    public static toCpfModel(user?: any): UserCpf | undefined {
        return (
            user &&
            new UserCpf(
                user.id,
                user.cpf,
                user.user_id
            )
        )
    };
};

export interface CpfInputDTO {
    token?: string,
    cpf: string
};