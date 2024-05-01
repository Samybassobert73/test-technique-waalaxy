import React, { useEffect, useState } from "react";
import { getCredit } from '../client/api'
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion";
import { getColorClass } from "../utils/utils";
import CreditI from "@/interfaces/credit.interface";


const Credit = () => {
  const [credits, setCredits] = useState<CreditI[]|null>(null);

  useEffect(() => {
    getCredit().then((data:CreditI[]) => {
      setCredits(data);
    });
  }, []);

  return (
    <span className="flex justify-between">
        <img src="/assets/logo-waalaxy.svg" alt="logo-waalaxy" width="100" height="100" />
        <div className="flex justify-center items-center">
          <h2 className="text-sm font-medium">Vos crédits :</h2>
          {credits !== null ? (
            <ul className="flex justify-center items-center">
              {credits.map((credit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{type: "spring", stiffness: 260, damping: 20}}
                    className="text-sm mx-2"
                  >
                    <Badge variant="outline" className={`${getColorClass(credit.value)}`}>
                      <span className="font-medium mr-2">{credit.type.name}:</span>
                      <span >{credit.value}</span>  
                    </Badge>
                  </motion.li>
              ))}
            </ul>
          ) : (
            <p className='text-sm font-small'>Chargement des crédits...</p>
          )}
        </div>
    </span>
  )}

  export default Credit