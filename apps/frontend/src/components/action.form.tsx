import React , {useEffect}from 'react'
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
import { postAction, getTypes } from '../client/api'
import { IoIosRocket } from "react-icons/io";
import { useAction } from '../context/action.context'
import TypeI from '@/interfaces/type.interface'

const formSchema = z.object({
    type: z.string().nonempty({
        message: "Action is required",
    }),
})
   
const Actionform = () => {
    const {addAction } = useAction()
    const [types, setTypes] = React.useState<TypeI[]>([])

    useEffect(() => {
        getTypes().then((data:TypeI[]) => {
          setTypes(data);
        });
    }, []);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { type } = values
        postAction(type).then((data) => {
            addAction(data);
        });
    }

    return (  
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col md:flex-row justify-start">
                <FormField
                control={form.control}
                name="type"
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
                            {types.map((type:TypeI) => (
                                <SelectItem key={type._id} value={type._id}>
                                {type.name}
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

export default Actionform