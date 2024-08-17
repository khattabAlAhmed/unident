import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    uri: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,

    batchesCollectionId: import.meta.env.VITE_APPWRITE_BATCHES_COLLECTION_ID,
    channelMessagesCollectionId: import.meta.env.VITE_APPWRITE_CHANNEL_MESSAGES_COLLECTION_ID,
    channelsCollectionId: import.meta.env.VITE_APPWRITE_CHANNELS_COLLECTION_ID,
    citiesCollectionId: import.meta.env.VITE_APPWRITE_CITIES_COLLECTION_ID,
    collagesCollectionId: import.meta.env.VITE_APPWRITE_COLLAGES_COLLECTION_ID,
    countriesCollectionId: import.meta.env.VITE_APPWRITE_COUNTRIES_COLLECTION_ID,
    formsCollectionId: import.meta.env.VITE_APPWRITE_FORMS_COLLECTION_ID,
    groupMessagesCollectionId: import.meta.env.VITE_APPWRITE_GROUP_MESSAGES_COLLECTION_ID,
    groupsCollectionId: import.meta.env.VITE_APPWRITE_GROUPS_COLLECTION_ID,
    librariesCollectionId: import.meta.env.VITE_APPWRITE_LIBRARIES_COLLECTION_ID,
    majorsCollectionId: import.meta.env.VITE_APPWRITE_MAJORS_COLLECTION_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    postsRepliesCollectionId: import.meta.env.VITE_APPWRITE_POSTS_REPLIES_COLLECTION_ID,
    profilesCollectionId: import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID,
    universitiesCollectionId: import.meta.env.VITE_APPWRITE_UNIVERSITIES_COLLECTION_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    subjectsCollectionId: import.meta.env.VITE_APPWRITE_SUBJECTS_COLLECTION_ID,
    libraryDocsCollectionId: import.meta.env.VITE_APPWRITE_LIBRARY_DOCS_COLLECTION_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.uri)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);




