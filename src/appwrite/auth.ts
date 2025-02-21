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
      return response ? this.login({ email, password }) : response; 
    } catch (e) {
      console.error("Auth :: createAccount",e);
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (e) {
      console.error(e);
    }
  }

  async getUser() {
    try {
      const user = await this.account.get();
      // Logged in
      return user;
    } catch (e) {
      console.error("Auth :: getUser",e);
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
