import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SingupValidation } from "@/lib/validation"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation, useSignInMutation } from "@/lib/react-query/QueriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {
    const { toast } = useToast();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();

    const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccountMutation();
    const { mutateAsync: signInAccount, isPending: isLoggingIn } = useSignInMutation();
    // 1. Define your form.
    const form = useForm<z.infer<typeof SingupValidation>>({
        resolver: zodResolver(SingupValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SingupValidation>) {
        const newUser = await createUserAccount(values);
        console.log(newUser);
        if (!newUser) {
            return toast({ title: "Field to signup." })
        }
        const session = await signInAccount({
            email: values.email,
            password: values.password,
        });
        if (!session) {
            return toast({ title: "Field to signin." })
        }
        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
            form.reset();
            navigate("/")
        } else {
            return toast({ title: "Field to signup." })
        }




    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="" />
                <h2 className="h3-bold sm:h2-bold pt-5 sm:pt-12">Create New Account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">To use Gergram enter you details</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Name" {...field} className="shad-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Username" {...field} className="shad-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Email" {...field} className="shad-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" {...field} className="shad-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="shad-button_primary" >
                        {isCreatingUser ? (
                            <div className="flex-center gap-2">
                                <Loader />
                                Loading...
                            </div>
                        ) : "Signup"}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account?
                        <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Signin</Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignupForm