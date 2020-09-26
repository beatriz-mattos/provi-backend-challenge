import { BaseDatabase } from "./BaseDatabase";
import { UserCpf } from '../models/UserCpf';
import { UserRegister } from "../models/UserRegister";
import { format } from "date-fns";

export class UserDatabase extends BaseDatabase {
  protected REGISTER_TABLE_NAME: string = "User_Register";
  protected CPF_TABLE_NAME: string = "User_Cpf";

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

      const response = await super.getConnection()
        .select("*")
        .from(this.REGISTER_TABLE_NAME)
        .where({ email })

      return UserRegister.toUserModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async addCpf(user: UserCpf): Promise<void> {
    try {

      await super.getConnection().raw(`
        INSERT INTO ${this.CPF_TABLE_NAME} (cpf, user_id, updated_at)
        VALUES (
          '${user.getCpf()}', 
          '${user.getId()}',
          '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}' 
        )
      `);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async findUserByCpf(cpf: string): Promise<UserCpf | undefined> {
    try {

      const response = await super.getConnection()
        .select("*")
        .from(this.CPF_TABLE_NAME)
        .where({ cpf })

      return UserCpf.toCpfModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updateCpf(cpf: string): Promise<void> {
    try {

      await super.getConnection().raw(`
        UPDATE ${this.CPF_TABLE_NAME}
        SET updated_at = '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'
        WHERE CPF = '${cpf}'
      `)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
  
};