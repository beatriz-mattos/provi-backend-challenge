export class AmountRequest {
    constructor(
        private id: string,
        private amount_request: string,
        private user_id: string
    ) {};

    public getId = () => this.id;
    public getAmountRequest = () => this.amount_request;
    public getUserId = () => this.user_id;

    public setId = (id: string) => this.id = id;
    public setAmountRequest = (amount_request: string) => this.amount_request;
    public setUserId = (user_id: string) => this.user_id;

    public static toAmountModel(amount?: any): AmountRequest | undefined {
        return (
            amount &&
            new AmountRequest(
                amount.id,
                amount.amount_request,
                amount.user_id
            )
        );
    };

};

export interface AmountRequestDTO {
    token?: string,
    amount_request: string
};