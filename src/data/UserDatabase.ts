import { UserPhone } from './../models/UserPhone';
import { UserBirthday } from './../models/UserBirthday';
import { UserName } from './../models/UserName';
import { BaseDatabase } from "./BaseDatabase";
import { UserCpf } from '../models/UserCpf';
import { UserRegister } from "../models/UserRegister";
import { format } from "date-fns";

export class UserDatabase extends BaseDatabase {
  protected REGISTER_TABLE_NAME: string = "User_Register";
  protected CPF_TABLE_NAME: string = "User_Cpf";
  protected FULL_NAME_TABLE_NAME: string = "User_Full_Name";
  protected BIRTHDAY_TABLE_NAME: string = "User_Birthday";
  protected PHONE_TABLE_NAME: string = "User_Phone";
  protected ADDRESS_TABLE_NAME: string = "User_Address";

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
        WHERE cpf = '${cpf}'
      `)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  // public async addFullName(user: UserName): Promise<void> {
  //   try {

  //     await super.getConnection().raw(`
  //       INSERT INTO ${this.FULL_NAME_TABLE_NAME} (first_name, last_name, user_id, updated_at)
  //       VALUES (
  //         '${user.getFullName()}', 
  //         '${user.getId()}',
  //         '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}' 
  //       )
  //     `);

  //   } catch (err) {
  //     throw new Error(err.sqlMessage || err.message);
  //   }
  // };

  // public async findUserByFullName(user: UserName): Promise<UserName | undefined> {
  //   try {

  //     const response = await super.getConnection().raw(`
  //       SELECT * from ${this.FULL_NAME_TABLE_NAME}
  //       WHERE first_name = '${user.getFirstName()}'
  //       AND last_name = '${user.getLastName()}'
  //     `);

  //     return UserName.toNameModel(response[0]);

  //   } catch (err) {
  //     throw new Error(err.sqlMessage || err.message);
  //   }
  // };

  // public async updateFullName(user: UserName): Promise<void> {
  //   try {

  //     await super.getConnection().raw(`
  //       UPDATE ${this.FULL_NAME_TABLE_NAME}
  //       SET updated_at = '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'
  //       WHERE first_name = '${user.getFirstName()}'
  //       AND last_name = '${user.getLastName()}'
  //     `)

  //   } catch (err) {
  //     throw new Error(err.sqlMessage || err.message);
  //   }
  // };

  public async addBirthDate(user: UserBirthday): Promise<void> {
    try {

      await super.getConnection().raw(`
        INSERT INTO ${this.BIRTHDAY_TABLE_NAME} (birth_date, user_id, updated_at)
        VALUES (
          '${user.getBirthDate()}', 
          '${user.getId()}',
          '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}' 
        )
      `);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async findUserByBirthDate(birth_date: string): Promise<UserBirthday | undefined> {
    try {

      const response = await super.getConnection()
        .select("*")
        .from(this.BIRTHDAY_TABLE_NAME)
        .where({ birth_date })

      return UserBirthday.toBirthModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updateBirthDate(birth_date: string): Promise<void> {
    try {

      await super.getConnection().raw(`
        UPDATE ${this.BIRTHDAY_TABLE_NAME}
        SET updated_at = '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'
        WHERE birth_date = '${birth_date}'
      `)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async addPhoneNumber(user: UserPhone): Promise<void> {
    try {

      await super.getConnection().raw(`
        INSERT INTO ${this.PHONE_TABLE_NAME} (phone_number, user_id, updated_at)
        VALUES (
          '${user.getPhoneNumber()}', 
          '${user.getId()}',
          '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}' 
        )
      `);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async findUserByPhoneNumber(phone_number: string): Promise<UserPhone | undefined> {
    try {

      const response = await super.getConnection()
        .select("*")
        .from(this.PHONE_TABLE_NAME)
        .where({ phone_number })

      return UserPhone.toPhoneModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updatePhoneNumber(phone_number: string): Promise<void> {
    try {

      await super.getConnection().raw(`
        UPDATE ${this.PHONE_TABLE_NAME}
        SET updated_at = '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'
        WHERE phone_number = '${phone_number}'
      `)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

};