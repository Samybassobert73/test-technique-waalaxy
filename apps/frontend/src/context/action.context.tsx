import React, { createContext, useContext, useState } from 'react';
import ActionI from '../interfaces/action.interface';

export type ActionContextType = {
    actions: ActionI[];
    setActions: React.Dispatch<React.SetStateAction<ActionI[]>>
    addAction: (newAction:ActionI) => void;
    removeAction: (id:string) => void;
};

  
export const ActionContext = createContext<ActionContextType>({} as ActionContextType);

export const useAction = () => useContext<ActionContextType>(ActionContext);


export const ActionProvider = ({ children }: { children: React.ReactNode }) => {
    const [actions, setActions] = useState<ActionI[]>([]);    

    const addAction = (newAction:ActionI): void => {
        setActions(prevActions => [...prevActions, newAction])
    }

    const removeAction = (id:string): void => {
        setActions(prevActions => prevActions.filter(action => action._id !== id))
    }
    return (
        <ActionContext.Provider value={{actions, setActions, addAction, removeAction}}>
            {children}
        </ActionContext.Provider>
    );
};