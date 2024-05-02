import React, { useEffect, useRef } from 'react'
import QueueList from './queueList';
import { useAction } from '@/context/action.context'
import { getActions } from '@/client/api'
import ActionI  from '@/interfaces/action.interface'
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap} from "@socket.io/component-emitter";

const Queue = () => {

    const {setActions, removeAction} = useAction()

    const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(); 

    useEffect(() => {
        getActions().then((data:ActionI[]) => {
            setActions(data)
        });
    }, []);


    useEffect(() => {
      socket.current = io("ws://localhost:3000");
  
      socket.current.on('remove-action', (data: string): void => {
        const actionParse = JSON.parse(data);
        removeAction(actionParse._id)
      });
      
      return () => {
        socket.current?.disconnect();
      };
    }, []);
    return (
        <div className="my-4">
            <h2 className="text-sm font-medium  mb-2">Liste d'attente :</h2>
            <QueueList/>
        </div>
    );
};

export default Queue;