import { UserAddress } from './../models/UserAddress';
import { UserPhone } from './../models/UserPhone';
import { UserBirthday } from './../models/UserBirthday';
import { UserName } from './../models/UserName';
import { BaseDatabase } from "./BaseDatabase";
import { UserCpf } from '../models/UserCpf';
import { UserRegister } from "../models/UserRegister";
import { format } from "date-fns";

export class UserDatabase extends BaseDatabase {
  protected REGISTER_TABLE: string = "User_Register";
  protected CPF_TABLE: string = "User_Cpf";
  protected NAME_TABLE: string = "User_Name";
  protected BIRTHDAY_TABLE: string = "User_Birthday";
  protected PHONE_TABLE: string = "User_Phone";
  protected ADDRESS_TABLE: string = "User_Address";

  public async createUser(user: UserRegister): Promise<void> {
    try {

      await super.getConnection().raw(`
        INSERT INTO ${this.REGISTER_TABLE} (id, email, password)
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

  public async findUserByEmail(email: string): Promise<UserRegister | undefined> {
    try {

      const response = await super.getConnection()
        .select("*")
        .from(this.REGISTER_TABLE)
        .where({ email })

      return UserRegister.toUserModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async addCpf(user: UserCpf): Promise<void> {
    try {

      await super.getConnection().raw(`
        INSERT INTO ${this.CPF_TABLE} (id, cpf, user_id, updated_at)
        VALUES (
          '${user.getId()}',
          '${user.getCpf()}',
          '${user.getUserId()}',
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
        .from(this.CPF_TABLE)
        .where({ cpf })

      return UserCpf.toCpfModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updateCpf(cpf: string): Promise<void> {
    try {

      await super.getConnection().raw(`
        UPDATE ${this.CPF_TABLE}
        SET updated_at = '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'
        WHERE cpf = '${cpf}'
      `)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async addFullName(name: UserName): Promise<void> {
    try {

      await super.getConnection()
        .insert({
          id: name.getId(),
          first_name: name.getFirstName(),
          last_name: name.getLastName(),
          updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          user_id: name.getUserId()
        })
        .into(this.NAME_TABLE)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async findUserByFullName(name: UserName): Promise<UserName | undefined> {
    try {

      const response = await super.getConnection()
        .select("*")
        .from(this.NAME_TABLE)
        .where({ first_name: name.getFirstName() })
        .andWhere({ last_name: name.getLastName() })

      return UserName.toNameModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updateFullName(user: UserName, nameId: string): Promise<void> {
    try {

      await super.getConnection()
        .update({ updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
        .into(this.NAME_TABLE)
        .where({ id: nameId })

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async getNameByUserId(id: string): Promise<UserName | undefined> {
    try {

      const response = await super.getConnection()
        .select("*")
        .from(this.NAME_TABLE)
        .where({ user_id: id })

      return UserName.toNameModel(response[0])

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async addBirthDate(user: UserBirthday): Promise<void> {
    try {

      await super.getConnection().raw(`
        INSERT INTO ${this.BIRTHDAY_TABLE} (id, birth_date, user_id, updated_at)
        VALUES (
          '${user.getId()}',
          '${user.getBirthDate()}',
          '${user.getUserId()}',
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
        .from(this.BIRTHDAY_TABLE)
        .where({ birth_date })

      return UserBirthday.toBirthModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updateBirthDate(birth_date: string): Promise<void> {
    try {

      await super.getConnection().raw(`
        UPDATE ${this.BIRTHDAY_TABLE}
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
        INSERT INTO ${this.PHONE_TABLE} (id, phone_number, user_id, updated_at)
        VALUES (
          '${user.getId()}',
          '${user.getPhoneNumber()}', 
          '${user.getUserId()}',
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
        .from(this.PHONE_TABLE)
        .where({ phone_number })

      return UserPhone.toPhoneModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updatePhoneNumber(phone_number: string): Promise<void> {
    try {

      await super.getConnection().raw(`
        UPDATE ${this.PHONE_TABLE}
        SET updated_at = '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'
        WHERE phone_number = '${phone_number}'
      `)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async addAddress(address: UserAddress): Promise<void> {
    try {

      await super.getConnection()
        .insert({
          id: address.getId(),
          cep: address.getCep(),
          street: address.getStreet(),
          number: address.getNumber(),
          complement: address.getComplement(),
          city: address.getCity(),
          state: address.getState(),
          user_id: address.getUserId(),
          updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        })
        .into(this.ADDRESS_TABLE)

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async findUserByAddress(address: UserAddress): Promise<UserAddress | undefined> {
    try {

      const response = await super.getConnection()
      .select("*")
      .from(this.ADDRESS_TABLE)
      .where({
        cep: address.getCep(),
        street: address.getStreet(),
        number: address.getNumber(),
        complement: address.getComplement(),
        city: address.getCity(),
        state: address.getState(),
      })

      return UserAddress.toAddressModel(response[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async updateAddress(address: UserAddress, addressId: string): Promise<void> {
    try {

      await super.getConnection()
        .update({ updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
        .into(this.ADDRESS_TABLE)
        .where({ id: addressId })

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

};