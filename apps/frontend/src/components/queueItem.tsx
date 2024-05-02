import React from 'react'
import {motion} from "framer-motion"
import ActionI from '@/interfaces/action.interface';

type QueueItemProps = {
    action:ActionI
    index:number
}
const QueueItem = ({action, index}:QueueItemProps) => {
    return (  
       
            <motion.li
            key={index}
            initial={{ x: 0, scale: 0, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            exit={{ x: "100%",  scale: 0.8, opacity: 0,}}
            transition={{type: "spring", stiffness: 260, damping: 20}}
            className={`shadow-md p-4 rounded-md mb-4 md:mb-0 md:m-2 bg-white text-sm font-small `}
            >
            {action.credit.type}
            </motion.li>
        
    )
}

export default QueueItem