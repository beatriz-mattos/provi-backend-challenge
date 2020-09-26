export class UserName {
    constructor(
        private id: string,
        private first_name: string,
        private last_name: string
    ) {};

    public getId = () => this.id;
    public getFirstName = () => this.first_name;
    public getLastName = () => this.last_name;

    public static toNameModel(user?: any): UserName | undefined {
        return(
            user &&
            new UserName(
                user.id,
                user.first_name,
                user.last_name
            )
        )
    };
};

export interface NameInputDTO {
    token?: string;
    first_name: string,
    last_name: string
};