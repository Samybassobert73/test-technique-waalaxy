import React, { useEffect, useRef } from 'react'
import QueueItem from './queueItem';
import { useAction } from '@/context/action.context'
import { getActions } from '@/client/api'
import ActionI  from '@/interfaces/action.interface'
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap} from "@socket.io/component-emitter";
import { AnimatePresence } from 'framer-motion';

const QueueList = () => {

    const {actions, setActions, removeAction} = useAction()

    const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(); 

    useEffect(() => {
        getActions().then((data:ActionI[]) => {
            setActions(data)
        });
    }, []);


    useEffect(() => {
      socket.current = io("ws://localhost:3000");
  
      socket.current.on('remove-action', (data: string): void => {
        const {_id} = JSON.parse(data);
        removeAction(_id)
      });
      
      return () => {
        socket.current?.disconnect();
      };
    }, []);
    return (
        <div className="my-4">
            <h2 className="text-sm font-medium  mb-2">Liste d'attente :</h2>
            <ul className="flex flex-col md:flex-row justify-start flex-wrap">
              { actions && actions.length > 0 ? (
                 <AnimatePresence>
                 { [...actions].reverse().map((action,index) => (
                      <QueueItem action={action} index={index} key={index}/>
                  ))}
                </AnimatePresence>  
            ) : (
                <p className='text-sm font-small'>Veuillez ajoutez une action...</p>
              )}
            
            </ul>
        </div>
    );
};

export default QueueList;