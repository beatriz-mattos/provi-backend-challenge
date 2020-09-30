export class UserPhone {
    constructor(
        private id: string,
        private phone_number: string
    ) {};

    public getId = () => this.id;
    public getPhoneNumber = () => this.phone_number;

    public setPhoneNumber(phone_number: string): void {
        this.phone_number = phone_number;
    };

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
    phone_number: string
};