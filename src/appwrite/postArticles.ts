import config from "../config/config";
import { Client, Databases, Query } from "appwrite";

class Database {
  client = new Client();
  databases;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }
  async createPost({
    title,
    slug,
    content,
    image,
    status,
    userId,
  }: {
    title: string;
    slug: string;
    content: string;
    image: string;
    status: boolean;
    userId: string;
  }) {
    //? Slug as unique ID
    try {
      const date = new Date().toISOString();
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          userId,
          date,
          status,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  //? Slug is ID here
  async updatePost(
    slug: string,
    {
      title,
      content,
      featuredImage,
      status,
    }: {
      title: string;
      content: string;
      featuredImage: string;
      status: boolean;
    }
  ) {
    try {
      const date = new Date().toISOString();
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          date,
          status,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", true)]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const database = new Database();
export default database;
