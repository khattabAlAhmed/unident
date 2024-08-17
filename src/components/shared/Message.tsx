import { useUserContext } from '@/context/AuthContext';
const Message = () => {
    const { user } = useUserContext();
    return (
        <div id="message" className="flex flex-col  bg-dark-2 p-2 rounded-md w-80 gap-4">
            <div className="flex gap-2">
                <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="" className='rounded-full w-[50px] h-[50px] ' />
                <div className="flex flex-col">
                    <p className="body-bold">{user.name}</p>
                    {/* <p className="small reqular text-light-3">@{user.username}</p> */}
                    <p className="small reqular text-light-3">{"@" + user.username}</p>
                </div>
            </div>
            <div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem assumenda nihil sint voluptas doloribus, optio unde suscipit. Dignissimos laborum ea quis, dolore quidem nesciunt sint ipsam dicta. Quis, quasi architecto?</p>
            </div>
        </div>
    )
}

export default Message