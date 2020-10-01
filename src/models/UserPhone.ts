export class UserPhone {
    constructor(
        private id: string,
        private phone_number: string,
        private user_id: string
    ) {};

    public getId = () => this.id;
    public getPhoneNumber = () => this.phone_number;
    public getUserId = () => this.user_id;

    public setPhoneNumber(phone_number: string): void {
        this.phone_number = phone_number;
    };

    public static toPhoneModel(user?: any): UserPhone | undefined {
        return (
            user &&
            new UserPhone(
                user.id,
                user.phone_number,
                user.user_id
            )
        )
    };
};

export interface PhoneInputDTO {
    token?: string,
    phone_number: string
};