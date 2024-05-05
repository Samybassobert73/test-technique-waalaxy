import React, { createContext, useContext, useState } from 'react';
import CreditI from '@/interfaces/credit.interface';

export type CreditContextType = {
    credits: CreditI[];
    setCredits: React.Dispatch<React.SetStateAction<CreditI[]>>;
    updateCredit: (id: string, newValue:number) => void
};

  
export const CreditContext = createContext<CreditContextType>({} as CreditContextType);

export const useCredit = () => useContext<CreditContextType>(CreditContext);


export const CreditProvider = ({ children }: { children: React.ReactNode }) => {
    const [credits, setCredits] = useState<CreditI[]>([]);    

     const updateCredit = (id: string, newValue:number): void => {
        setCredits((prev) => {
        return prev.map((credit) => {
            if (credit._id === id) {
            return { ...credit, value: newValue };
            }
            return credit;
        });
        });
    }
    return (
        <CreditContext.Provider value={{credits, setCredits, updateCredit}}>
            {children}
        </CreditContext.Provider>
    );
};