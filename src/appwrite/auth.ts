import config from "../config/config";
import { Client, Account, ID } from "appwrite";
class Auth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return response ? this.login({ name, password }) : response; //! fix afterward
    } catch (e) {
      console.error(e);
    }
  }

  async login({ name, password }: { name: string; password: string }) {
    try {
      return await this.account.createEmailPasswordSession(name, password);
    } catch (e) {
      console.error(e);
    }
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.error(e);
    }
    return null;//?To Handle Error
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (e) {
      console.error(e);
    }
    return null;//?To Handle Error
  }
}

export default new Auth();
