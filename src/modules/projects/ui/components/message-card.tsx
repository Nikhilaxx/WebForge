import { Card } from "@/components/ui/card";
import{Fragment,MessageRole, MessageType} from "@/generated/prisma"
import { cn } from "@/lib/utils";
import {format} from "date-fns";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import Image from "next/image";


interface UserMessageProps {
    content : string;
}

const UserMessage = ({content}:UserMessageProps) =>{
    return(
        <div className="flex justify-end pb-4 pr-2 pl-10">
            <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
                {content}
            </Card>
        </div>
    )
}

interface FragmentCardProps{
    fragments : Fragment;
    isActiveFragment : boolean;
    onFragmentClick : (fragments : Fragment) => void;
}

const FragmentCard =({
    fragments,
    isActiveFragment,
    onFragmentClick}:FragmentCardProps) => {
        return (
            <button className={cn(
                "flex items-center text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary hover:text-black transition-colors" ,
                isActiveFragment && "bg-primary text-primary-foreground border-primary hover:bg-primary"
             )}
             onClick={()=> onFragmentClick(fragments)}
             >
                <Code2Icon className="size-4 mt-0.5"/>
                <div className="flex flex-col flex-1">
                    <span className="text-sm font-medium line-clamp-1">
                        {fragments.title}
                    </span>
                    <span className="text-sm">
                        Preview
                    </span>
                </div>
                <div className="flex items-center justify-center mt-0.5">
                    <ChevronRightIcon className="size-4"/>
                </div>
            </button>
        )
    };  

interface AssistantMessageProps {
    content: string;
    fragments: Fragment | null;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: Fragment) => void;
    type: MessageType;
}
export const AssistantMessage =({
    content,
    fragments,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type,
}:AssistantMessageProps)=>{
    return(
        <div className={cn(
           "flex flex-col group px-2 pb-4",
            type==="ERROR" && "text-red-700 dark:text-red-500"
        )}>
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image 
                src="/logo.svg"
                alt="WebForge"
                width={40}
                height={40}
                className="shrink-0"
                />
                <span className="text-sm font-medium">
                    WebForge
                </span>
                <span className="text-xs text-muted-foreground opacity-0 transition-opacity 
                group-hover:opacity-100">
                    {format(createdAt,"HH:mm 'on' MM dd,yyyy")}
                </span>
            </div>
            <div className="pl-13 flex flex-col gap-y-4">
                <span>{content}</span>
                {fragments && type==="RESULT" && (
                    <FragmentCard
                    fragments={fragments}
                    isActiveFragment={isActiveFragment}
                    onFragmentClick={onFragmentClick}
                    />
                    )}
            </div>

        </div>
    )
}

interface MessageCardProps {
    content: string;
    role: MessageRole;
    fragments: Fragment | null;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: Fragment) => void;
    type: MessageType;

};
export const MessageCard = ({
    content,
    role,
    fragments,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type,
}: MessageCardProps) => {
    if(role==="ASSISTANT"){
        return(
            <AssistantMessage
            content={content}
            fragments={fragments}
            createdAt={createdAt}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
            type={type}

            />
        )
    }
        return(
            <UserMessage 
            content={content}
            />
        )
    
}