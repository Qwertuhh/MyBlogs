import config from "../config/config";
import { Client, ID, Storage } from "appwrite";

class Images {
  client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);
  buckets = new Storage(this.client);

  async uploadImage(file: File) {
    try {
      return await this.buckets.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error(error);
    }
  }

  async deleteImage(id: string) {
    try {
      return await this.buckets.deleteFile(config.appwriteBucketId, id);
    } catch (error) {
      console.error(error);
    }
  }

  getImage(id: string) {
    try {
      return this.buckets.getFileView(config.appwriteBucketId, id);
    } catch (error) {
      console.error(error);
    }
  }
}
export default new Images();
