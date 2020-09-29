export class UserBirthday {
    constructor(
        private id: string,
        private birth_date: string
    ) {};

    public getId = () => this.id;
    public getBirthDate = () => this.birth_date;

    public setBirthDate(birth_date: string): void {
        this.birth_date = birth_date;
    };

    public static toBirthModel(user?: any): UserBirthday | undefined {
        return(
            user &&
            new UserBirthday(
                user.id,
                user.birth_date
            )
        )
    };
};

export interface BirthdayInputDTO {
    token?: string,
    birth_date: string
};