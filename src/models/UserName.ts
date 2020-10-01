export class UserName {
    constructor(
        private id: string,
        private first_name: string,
        private last_name: string,
        private user_id: string
    ) {};

    public getId = () => this.id;
    public getUserId = () => this.user_id;
    public getFirstName = () => this.first_name;
    public getLastName = () => this.last_name;

    public static toNameModel(user?: any): UserName | undefined {
        return (
            user &&
            new UserName(
                user.id,
                user.first_name,
                user.last_name,
                user.user_id
            )
        )
    };
};

export interface NameInputDTO {
    token?: string;
    full_name: string;
};