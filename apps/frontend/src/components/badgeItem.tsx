import React from 'react'
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion";
import { getColorClass } from "../utils/utils";
import CreditI from '@/interfaces/credit.interface';
type BadgeItemProps = {
    credit:CreditI
    index:number
}
const BadgeItem = ({credit, index}:BadgeItemProps) => {
  return (
    <motion.li
    key={index}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{type: "spring", stiffness: 260, damping: 20}}
    className="text-sm"
    >
    <Badge variant="outline" className={`${getColorClass(credit.value)}`}>
        <span className="font-bold mr-2">{credit.type}:</span>
        <span >{credit.value}</span>  
    </Badge>
    </motion.li>
  )
}

export default BadgeItem