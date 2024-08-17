import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
    gender: "male",
    adminOf: "none",
    ids: ["", "loading", "loading", "loading", "loading"],
    level: "",
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    isSettedUp: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
};

type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    isSettedUp: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSettedUp, setSsSettedUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuthUser = async () => {
        setIsLoading(true);
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                    gender: currentAccount.gender,
                    // adminOf: currentAccount.adminOf.$id,
                    ids: [
                        "",
                        currentAccount.batch.group.$id,
                        currentAccount.batch.channel.$id,
                        currentAccount.batch.form.$id,
                        currentAccount.batch.library.$id,
                        currentAccount.$id
                    ],
                    level: currentAccount.batch.currentLevel.toString(),
                });
                setIsAuthenticated(true);

                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
            cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) {
            navigate("/sign-in");
        }

        checkAuthUser();
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        isSettedUp,
        setIsAuthenticated,
        checkAuthUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
