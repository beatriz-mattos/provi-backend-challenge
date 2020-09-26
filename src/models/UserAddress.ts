export class UserAddress {
    constructor(
        private id: string,
        private cep: string,
        private street: string,
        private number: number,
        private complement: string,
        private city: string,
        private state: string
    ) {};

    public getId = () => this.id;
    public getCep = () => this.cep;
    public getStreet = () => this.street;
    public getNumber = () => this.number;
    public getComplement = () => this.complement;
    public getCity = () => this.city;
    public getState = () => this.state;

    public static toAddressModel(user?: any): UserAddress | undefined {
        return(
            user &&
            new UserAddress(
                user.id,
                user.cep,
                user.street,
                user.number,
                user.complement,
                user.city,
                user.state
            )
        )
    };
};

export interface AddressInputDTO {
    token?: string,
    cep: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string
};