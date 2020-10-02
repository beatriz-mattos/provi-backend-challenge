export class UserAmountRequested {
    constructor(
        private id: string,
        private amount_requested: number,
        private user_id: string
    ) {};

    public getId = () => this.id;
    public getAmountRequested = () => this.amount_requested;
    public getUserId = () => this.user_id;

    public static toAmountModel(amount?: any): UserAmountRequested | undefined {
        return (
            amount &&
            new UserAmountRequested(
                amount.id,
                amount.amount_requested,
                amount.user_id
            )
        );
    };

};

export interface AmountRequestedDTO {
    token?: string,
    amount_requested: number
};