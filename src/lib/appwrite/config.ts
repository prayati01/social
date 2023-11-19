import { Account, Avatars, Client, Databases, Storage } from 'appwrite';

export const appwriteConfig={
    projectId: '6544c5267f5d9e81b519' ,
    url:'https://cloud.appwrite.io/v1',
    databaseId: '655a67b9a2433dd4b490',
    savesllectionId:'655a684e525a648a82d8',
    postCollectionId:'655a67f395a3773a26f0',
    userCollectionId:'655a683cc98f0f8d40ed',
}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);