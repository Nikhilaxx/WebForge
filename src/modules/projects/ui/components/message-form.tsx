import{useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {z} from "zod";
import { toast } from "sonner";
import { ArrowUpIcon,Loader2Icon } from "lucide-react";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form ,FormField} from "@/components/ui/form";

interface Props{
    projectId: string
}

const formSchema = z.object({
    value:
      z.string()
      .min(1,{message:"Value is required"})
      .max(10000,{message:"Value is too long"}),
})

export const MessageForm = ({projectId}:Props) => {
    const form=useForm<z.infer<typeof formSchema>>
    ({resolver:
        zodResolver(formSchema),
    defaultValues:
    {value:""},
    });
    return (

        <Form {...form}>
            MessageForm
            </Form>
    )
}