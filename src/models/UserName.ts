export class UserName {
    constructor(
        private id: string,
        private full_name: string
    ) {};

    public getId = () => this.id;

    public getFirstName(): string | undefined {
        const fullName = this.full_name.split(" ");
        const firstName = fullName[0];

        return firstName
    };

    public getLastName(): string | undefined {
        const fullName = this.full_name.split(" ");
        const lastName = fullName[fullName.length -1]
        
        return lastName
    };

    public getFullName(): string | undefined {
        return this.full_name
    };

    public setFullName(full_name: string): void {
        this.full_name = full_name;
    };

    public static toNameModel(user?: any): UserName | undefined {
        return (
            user &&
            new UserName(
                user.id,
                user.full_name
            )
        )
    };
};

export interface NameInputDTO {
    token?: string;
    full_name: string;
};