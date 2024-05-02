import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { postAction } from '../client/api'
import { IoIosRocket } from "react-icons/io";
import { useAction } from '../context/action.context'
import { useCredit } from "@/context/credit.context";
import CreditI from '@/interfaces/credit.interface'
import ActionI from '@/interfaces/action.interface'

const formSchema = z.object({
    credit: z.string().nonempty({
        message: "Action is required",
    }),
})
   
const ActionForm = () => {
    const {addAction } = useAction()
    const {credits} = useCredit()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { credit } = values
        postAction(credit).then((data:ActionI) => {
            addAction(data);
        });
    }

    return (  
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col md:flex-row justify-start">
                <FormField
                control={form.control}
                name="credit"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Selectionnez une action</FormLabel>   
                        <Select onValueChange={field.onChange}>
                        <FormControl {...field} >
                            <SelectTrigger className="w-[180px] focus:ring-1 focus:ring-[#315ae7]"  >
                                <SelectValue placeholder="Selectionner une Action" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>...</SelectLabel>
                            {credits.map((credit:CreditI, index) => (
                                <SelectItem key={index} value={credit._id}>
                                {credit.type}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button variant={"waalaxy"} type="submit"> 
                    <IoIosRocket className='mr-2'/>
                    Envoyez
                </Button>
            </form>
        </Form>                    
    )
}

export default ActionForm