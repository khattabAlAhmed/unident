import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link, Navigate, useNavigate } from "react-router-dom"

const FormSchema = z.object({
    country: z
        .string({
            required_error: "Please select an country to display.",
        }),
})




const SelectCountry = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);


    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl className="border border-dark-4 ">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your country..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black border border-dark-4">
                                    <SelectItem value="m@example.com" className="shad-selection">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com" className="shad-selection">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com" className="shad-selection">m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="shad-button_primary" >
                    Next Step
                </Button>
            </form>
        </Form>
    )
}

export default SelectCountry


