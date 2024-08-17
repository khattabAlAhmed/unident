import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createUserAccount, getGroupMessages, signInAccount, signOutAccount } from "../appwrite/api";
import { INewUser } from "@/types";

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}
export const useSignInMutation = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    })
}
export const useSignOutMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}
export const useGetGroupMessagesMutation = () => {
    return useMutation({
        mutationFn: (id: string) => getGroupMessages(id)
    })
}