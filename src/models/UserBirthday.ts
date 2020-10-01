export class UserBirthday {
    constructor(
        private id: string,
        private birth_date: string,
        private user_id: string
    ) {};

    public getId = () => this.id;
    public getBirthDate = () => this.birth_date;
    public getUserId = () => this.user_id;

    public setBirthDate(birth_date: string): void {
        this.birth_date = birth_date;
    };

    public static toBirthModel(user?: any): UserBirthday | undefined {
        return(
            user &&
            new UserBirthday(
                user.id,
                user.birth_date,
                user.user_id
            )
        )
    };
};

export interface BirthdayInputDTO {
    token?: string,
    birth_date: string
};