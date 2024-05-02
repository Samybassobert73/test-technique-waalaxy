import React, { useEffect, useRef, useState } from "react";
import { getCredit } from '../client/api'
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion";
import { getColorClass } from "../utils/utils";
import CreditI from "@/interfaces/credit.interface";
import { io, Socket }  from "socket.io-client";
import { DefaultEventsMap} from "@socket.io/component-emitter";

const Credit = () => {
  const [credits, setCredits] = useState<CreditI[]|null>(null);
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>| undefined>(undefined); 

  useEffect(() => {
    socket.current = io("ws://localhost:3000");

    socket.current.on('decrement-credit', (data: string): void => {
       const { _id, value } = JSON.parse(data);
       updateCredits(_id, value);
    });

    socket.current.on('refresh-credit', (data: string): void => {
      setCredits(JSON.parse(data));
   });
    return () => {
      socket.current?.disconnect();
    };
  }, []);


  const updateCredits = (id: string, newValue:number): void => {
    setCredits((prev) => {
      return prev.map((credit) => {
        if (credit._id === id) {
          return { ...credit, value: newValue };
        }
        return credit;
      });
    });
  }

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