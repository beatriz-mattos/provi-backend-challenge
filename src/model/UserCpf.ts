export class UserCpf {
    constructor(
        private id: string,
        private cpf: string
    ) {};

    public getId = () => this.id;
    public getCpf = () => this.cpf;

    public static toCpfModel(userCpf?: any): UserCpf | undefined {
        return (
            userCpf &&
            new UserCpf(
                userCpf.id,
                userCpf.cpf
            )
        )
    };
};

export interface CpfInputDTO {
    token?: string,
    cpf: string
};