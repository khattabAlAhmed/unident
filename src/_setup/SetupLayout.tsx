import { Navigate, Outlet } from 'react-router-dom';

const SetupLayout = () => {
    // const isAuthenticated = true;
    const isSettedUp = false;
    return (
        <>
            {isSettedUp ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <img src="/assets/images/side-img.svg" alt="logo"
                        className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
                    <section className='flex flex-1 justify-center items-center flex-col py-10'>
                        <Outlet />
                    </section>
                </>
            )}
        </>
    )
}

export default SetupLayout