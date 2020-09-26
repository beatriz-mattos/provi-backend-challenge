export class UserPhone {
    constructor(
        private id: string,
        private phone_number: number
    ) {};

    public getId = () => this.id;
    public getPhoneNumber = () => this.phone_number;

    public static toPhoneModel(user?: any): UserPhone | undefined {
        return (
            user &&
            new UserPhone(
                user.id,
                user.phone_number
            )
        )
    };
};

export interface PhoneInputDTO {
    token?: string,
    phone_number: number
};