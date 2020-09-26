export class UserCpf {
    constructor(
        private id: string,
        private cpf: string
    ) {};

    public getId = () => this.id;
    public getCpf = () => this.cpf;

    public static toCpfModel(user?: any): UserCpf | undefined {
        return (
            user &&
            new UserCpf(
                user.id,
                user.cpf
            )
        )
    };
};

export interface CpfInputDTO {
    token?: string,
    cpf: string
};