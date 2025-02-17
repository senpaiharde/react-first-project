import { useState, useEffect } from "react";
import { eventBusService } from "../services/eventBusService";

export function UserMsg() {
    const [msg, setMsg] = useState(null);
    useEffect(()=>{
        const removeListener = eventBusService.on('show-msg', (msg)=>{
            setMsg(msg);
            setTimeout(() => 
                setMsg(null)
            , 3000);
        });
        return () => removeListener();
    },[]);

    if(!msg) return null;

    return(
        <div className={`user-msg ${msg.type}`}> {msg.text}</div>
    )
}