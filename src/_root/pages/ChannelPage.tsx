import Message from "@/components/shared/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { channelMessages } from "@/constants";
import { useUserContext } from "@/context/AuthContext"
import { extractTime } from "@/lib/functions/time";
import { useState } from "react";
import { Link } from "react-router-dom";



const ChannelPage = () => {
    const { user } = useUserContext();
    const [showDialog, setShowDialog] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const toggleDialog = (indexOfCardMessage?: string) => {
        setSelectedCard(indexOfCardMessage || null);
        setShowDialog(prev => !prev);
    };
    return (
        <div className="flex flex-1">
            {/* Dialog Overlay */}
            <div className={`${showDialog ? "flex" : "hidden"} absolute top-0 bottom-0 left-0 right-0 bg-dark-2/85 w-full h-screen z-50 justify-center`}>
                <div className="bg-dark-1 p-6 fixed right-8 rounded-full hover:bg-dark-4 top-8  cursor-pointer" onClick={() => toggleDialog()}>
                    <img
                        src="/assets/icons/search.svg"
                        alt="Close"
                        className=""
                    />
                </div>
                {selectedCard && (
                    <div className=" bg-dark-3 w-1/2 p-8 flex flex-col gap-4">
                        <h3 className="h1-bold text-primary-600">{channelMessages[parseInt(selectedCard)].cardTitle}</h3>
                        <p className="h3-bold">{channelMessages[parseInt(selectedCard)].cardValue}</p>


                        {channelMessages[parseInt(selectedCard)].cardDescription ? (
                            <p>{channelMessages[parseInt(selectedCard)].cardDescription}</p>
                        ) : (
                            <div className="flex items-center justify-center">There's no description to show.</div>
                        )}
                        {channelMessages[parseInt(selectedCard)].cardValue && (
                            <Link to={"/group/asdsad"}>
                                <div className="flex bg-dark-4 p-4 bg-primary-600/50 border-white border rounded-xl gap-4 hover:bg-primary-600/90 cursor-pointer">
                                    <img src="/assets/icons/search.svg" alt="" color="white" />
                                    <div className="bg-primary-600 w-1 h-full"></div>
                                    <p>{channelMessages[parseInt(selectedCard)].cardValue}</p>
                                </div>
                            </Link>
                        )}
                    </div>
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
                <div className="flex-1 messages custom-scrollbar overflow-y-scroll flex flex-col px-16 h-full mt-2 gap-4">
                    {channelMessages.map((message, i) => (
                        <div key={i} id={i.toString()} className={`flex flex-col bg-dark-2 p-3 rounded-xl w-80 gap-4`}>
                            <div className="flex flex-col">
                                <p className="body-bold">{"Admin"}</p>
                                <p className="small-reqular text-light-3">{"@" + "omer " + user.id}</p>
                            </div>
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
                            {message.card && (

                                <div className="w-full overflow-hidden rounded-lg cursor-pointer flex flex gap-2 border-primary-600 border p-2 hover:bg-primary-500/25" onClick={() => toggleDialog(i.toString())} >
                                    <div className="flex items-center justify-center w-1/4">
                                        <img src={"/assets/icons/search.svg"} alt="message-image" className="w-7 h-7" />
                                    </div>
                                    <div className="bg-primary-500 w-1 h-full"></div>
                                    <div className="flex w-full flex-col justify-center">
                                        <p className="text-white body-bold text-clip overflow-hidden">{message.cardTitle}</p>
                                        {message.cardValue && (
                                            <p className="small-semibold text-light-3  text-clip overflow-hidden">{message.cardValue.slice(0, 65)}</p>
                                        )}
                                    </div>
                                </div>

                            )}
                            <div>
                                <p>{message.content}</p>
                            </div>
                            <p className="small-regular text-light-3 ml-auto">{extractTime(message.at)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChannelPage