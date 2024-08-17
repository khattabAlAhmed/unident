import { EnumValues } from "zod";

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};

export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};

export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
};

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
};

export type ICountry = {
    id: string,
    name: string,
    arabicName: string,
    code: string,
    flag: URL,
    cities: Array<ICity>,
}
export type ICity = {
    id: string,
    name: string,
    arabicName: string,
    code: string,
    county: ICountry,
    universities: Array<IUniversity>,
}
export type IUniversity = {
    id: string,
    name: string,
    arabicName: string,
    city: ICity,
    collages: Array<ICollage>,
}
export type ICollage = {
    id: string,
    name: string,
    arabicName: string,
    university: IUniversity,
    majors: Array<IMajor>,

}
export type IMajor = {
    id: string,
    name: string,
    arabicName: string,
    collage: ICollage,
    batches: Array<IBatch>,
}
export type IBatch = {
    id: string,
    startedAt: Date,
    currentLevel: number,
    major: IMajor,
    members: IUser,
    group: IGroup,
    form: IForm,
    current: string,
    city: ICity,
    collage: ICollage,
    batches: Array<IBatch>,
    admin: IUser,
}
export type IGroup = {
    id: string,
    batch: IBatch,
    groupMessages: Array<IGroupMessages>,
}
export type IGroupMessages = {
    id: string,
    content: string,
    img: URL,
    user: IUser,
    at: Date,
    groups: IGroup,
    repliedTo: string,
}
export type IForm = {
    id: string,
    batch: IBatch,
    formPosts: Array<IFormPost>,
}
export type IFormPost = {
    id: string,
    content: string,
    title: string,
    author: IUser,
    likes: Array<IUser>,
    at: Date,
    form: IForm,
    postReplies: IPostReply
}
export type IPostReply = {
    id: string,
    content: string,
    title: string,
    answerAuthor: IUser,
    upvotes: Array<IUser>,
    at: Date,
    post: IFormPost,
}
export type IChannel = {
    id: string,
    batch: IBatch,
    messages: Array<IChannelMessage>
}
enum cardsEnum {
    file,
    date,
    user,
    location,
}
export type IChannelMessage = {
    id: string,
    user: IUser,
    img: URL,
    content: string,
    at: Date,
    channel: IChannel,
    card: cardsEnum,
    cardValue: string,
}
export type ISubject = {
    id: string,
    name: string,
    arabicName: string,
    teacher: IUser,
    docs: Array<ILibraryDoc>
}
export type ILibrary = {
    id: string,
    batch: IBatch,
    docs: Array<ILibraryDoc>
}
enum docsEnum {
    summary, exam, course
}
export type ILibraryDoc = {
    id: string,
    name: string,
    subject: ISubject,
    year: number,
    type: docsEnum,
    docUrl: URL,
    library: ILibrary,
}

// export type IUser = {
//     id: string,
//     name: string;
//     username: string;
//     email: string;
//     imageUrl: string;
//     bio: string;
// };

enum genderEnum {
    male, female
}

export type IUser = {
    id: string,
    name: string,
    username: string,
    // birthday: Date,
    gender: string,
    email: string,
    // accountId: string,
    imageUrl: string,
    bio: string,
    adminOf?: string,
    ids: Array<string>,
    level: string,
    // batch: IBatch,
    // channelMessages: Array<IChannelMessage>,
    // groupMessages: Array<IGroupMessages>,
    // likedPosts: Array<IFormPost>,
    // posts: Array<IFormPost>,
    // upvotedAnswers: Array<IPostReply>,


}
export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
};

