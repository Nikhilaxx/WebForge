import { useState } from "react";
import { ExternalLinkIcon,RefreshCcwIcon } from "lucide-react";
import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";


interface Props{
    data:Fragment;
}

export function FragmentWeb({data}:Props) {
    const [fragmentKey, setFragmentKey] = useState(0);  
    const [copied,setCopied] = useState(false);

    const onRefresh=()=>{
        setFragmentKey((prev)=>prev+1);
    }
    const handleCopy=()=>{
        navigator.clipboard.writeText(data.sandboxUrl || "");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }


    return(
        <div className="flex flex-col w-full h-full">
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Button size="sm" variant="outline" onClick={onRefresh}>
                    <RefreshCcwIcon className="size-4" />
                </Button>
                <Button 
                size="sm" page
                variant="outline"
                 onClick={handleCopy}
                 disabled={!data.sandboxUrl||copied}
                 className="flex-1 justify-start text-start font-normal"
                 >
                    <span className="truncate">
                     {data.sandboxUrl}
                    </span>
                </Button>
                <Button
                size="sm"
                disabled={!data.sandboxUrl}
                variant="outline"
                onClick={() => {
                    if(!data.sandboxUrl) return;
                    window.open(data.sandboxUrl, "_blank")}}
                >
                    <ExternalLinkIcon className="size-4" />
                </Button>
            </div>
            <iframe className="w-full h-full" 
            sandbox="allow-forms allow-scripts allow-same-origin"
            loading="lazy"
            src={data.sandboxUrl} />
        </div>
    )
}