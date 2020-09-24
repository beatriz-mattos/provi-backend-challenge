import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  protected REGISTER_TABLE_NAME: string = "User_Data";
  protected CPF_TABLE_NAME: string = "User_Cpf";
  protected ADDRESS_TABLE_NAME: string = "User_Address";
  protected PHONE_TABLE_NAME: string = "User_Phone_Number";

  public async createUser(user: User): Promise<void> {
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
  
  public async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await super.getConnection()
        .select("*")
        .from(this.REGISTER_TABLE_NAME)
        .where({ email })
        
      return User.toUserModel(result[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

};