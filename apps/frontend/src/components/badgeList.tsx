import React, { useEffect,useRef  } from "react";
import { getCredit } from '../client/api'
import CreditI from "@/interfaces/credit.interface";
import { io, Socket }  from "socket.io-client";
import { DefaultEventsMap} from "@socket.io/component-emitter";
import { useCredit } from "@/context/credit.context";
import BadgeItem from "./badgeItem";

const BadgeList = () => {
  const {credits, setCredits, updateCredit} = useCredit()
 const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>| undefined>(undefined); 

  useEffect(() => {
    getCredit().then((data:CreditI[]) => {
      setCredits(data)
    });
  }, []);

  useEffect(() => {
    socket.current = io(`ws://${import.meta.env.VITE_API_URL}`);

    socket.current.on('decrement-credit', (data: string): void => {
       const { _id, value } = JSON.parse(data);
       updateCredit(_id, value);
    });

    socket.current.on('refresh-credit', (data: string): void => {
      setCredits(JSON.parse(data));
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return (
    <span className="flex justify-between">
        <img src="/assets/logo-waalaxy.svg" alt="logo-waalaxy" width="100" height="100" />
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-sm font-medium">Vos crédits :</h2>
          {credits !== null ? (
            <ul className="flex justify-center items-center gap-2">
              {credits && credits.map((credit:CreditI, index:number) => (
                  <BadgeItem credit={credit} key={index} index={index}/>
              ))}
            </ul>
          ) : (
            <p className='text-sm font-small'>Chargement des crédits...</p>
          )}
        </div>
    </span>
  )}

  export default BadgeList