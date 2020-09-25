import { BaseDatabase } from "./BaseDatabase";
import { UserRegister } from "../model/UserRegister";

export class UserRegisterDatabase extends BaseDatabase {
  protected REGISTER_TABLE_NAME: string = "User_Data";

  public async createUser(user: UserRegister): Promise<void> {
    try {
      await super.getConnection().raw(`
        INSERT INTO ${this.REGISTER_TABLE_NAME} (id, email, password)
        VALUES (
          '${user.getId()}', 
          '${user.getEmail()}',
          '${user.getPassword()}'
        );
     `);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
  
  public async getUserByEmail(email: string): Promise<UserRegister | undefined> {
    try {
      const result = await super.getConnection()
        .select("*")
        .from(this.REGISTER_TABLE_NAME)
        .where({ email })
        
      return UserRegister.toUserModel(result[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
};