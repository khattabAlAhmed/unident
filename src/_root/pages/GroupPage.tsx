import Message from "@/components/shared/Message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messages } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { extractTime } from "@/lib/functions/time";
import { useState } from "react";
import { Link } from "react-router-dom";

const GroupPage = () => {
    const { user } = useUserContext();
    const [showDialog, setShowDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const toggleDialog = (imgSrc?: string) => {
        setSelectedImage(imgSrc || null);
        setShowDialog(prev => !prev);
    };

    return (
        <div className="flex flex-1">
            {/* Dialog Overlay */}
            <div className={`${showDialog ? "flex" : "hidden"} absolute top-0 bottom-0 left-0 right-0 bg-dark-2/85 w-full h-screen z-50 justify-center items-center`}>
                <div className="bg-dark-1 p-6 fixed right-8 rounded-full hover:bg-dark-4 top-8  cursor-pointer" onClick={() => toggleDialog()}>
                    <img
                        src="/assets/icons/search.svg"
                        alt="Close"
                        className=""
                    />
                </div>
                {selectedImage && (
                    <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-full" />
                )}
            </div>

            <div className="full-container relative">
                <div className="group-header sticky top-0 z-10">
                    <p className="h3-bold">IT Level {user.level} Discuss Group</p>
                    <div className="flex gap-4">
                        <img src="/assets/icons/search.svg" alt="" />
                        <img src="/assets/icons/filter.svg" alt="" />
                    </div>
                </div>
                <div className="flex-1 messages custom-scrollbar overflow-y-scroll flex flex-col px-16 h-full my-2 gap-4">
                    {messages.map((message, i) => (
                        <div key={i} id={i.toString()} className={`flex flex-col bg-dark-2 p-3 rounded-xl w-80 gap-4 ${message.user.id === user.id ? "" : "ml-auto"}`}>
                            <div className="flex gap-2">
                                <img src={message.user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="" className='rounded-full w-[50px] h-[50px]' />
                                <div className="flex flex-col">
                                    <p className="body-bold">{message.user.name}</p>
                                    <p className="small-reqular text-light-3">{"@" + message.user.username}</p>
                                </div>
                            </div>
                            {message.repliedTo && (
                                <div className="bg-dark-4 p-2 pl-6 rounded-lg overflow-hidden flex relative cursor-pointer">
                                    <a href={`#${message.repliedTo}`}>
                                        <div className="bg-primary-500 w-2 h-full absolute left-0 top-0"></div>
                                        <p className="text-light-4 text-clip overflow-hidden">
                                            {messages[parseInt(message.repliedTo)].content.slice(0, 65)}
                                            {messages[parseInt(message.repliedTo)].content.length > 65 ? "..." : ""}
                                        </p>
                                    </a>
                                </div>
                            )}
                            {message.img && (
                                <div className="w-full h-48 overflow-hidden rounded-lg cursor-pointer">
                                    <img
                                        src={message.img}
                                        alt="message-image"
                                        className="w-full"
                                        onClick={() => toggleDialog(message.img)} // Open dialog with image
                                    />
                                </div>
                            )}
                            <div>
                                <p>{message.content}</p>
                            </div>
                            <p className="small-regular text-light-3 ml-auto">{extractTime(message.at)}</p>
                        </div>
                    ))}
                </div>
                <div className="flex px-4 py-4 bg-dark-4 gap-6 group-input z-10">
                    <img src="/assets/icons/search.svg" alt="" />
                    <Textarea className="shad-group-textarea" />
                    <img src="/assets/icons/search.svg" alt="Send" />
                    <img src="/assets/icons/search.svg" alt="Attach" />
                </div>
            </div>
        </div>
    );
};

export default GroupPage;