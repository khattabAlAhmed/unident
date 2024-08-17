import { IGroupMessages, INewUser } from "@/types";
import { account, avatars, databases, appwriteConfig } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );
        console.log(newAccount)
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        })
        return newUser;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: String,
    name: String,
    username?: String,
    email: String,
    imageUrl: URL,
}) {
    try {
        const savedUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user,
        )
        if (!savedUser) throw Error;
        return savedUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: {
    email: string,
    password: string
}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password)
        if (!session) throw Error;
        const loggedUser = await getCurrentUser();
        console.log(loggedUser);
        return session;
    } catch (error) {
        signOutAccount()
        console.log(error);
    }
}
export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}
export async function initializeCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        console.log(currentUser);
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error)
    }
}



export async function getGroupMessages(groupId: string) {
    try {
        const messages = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.groupsCollectionId,
            groupId,
        )
        if (!messages) throw Error;
        console.log(messages.groupMessages);
        return messages.groupMessages;
    } catch (error) {
        console.log(error);
    }
}

