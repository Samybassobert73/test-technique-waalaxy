import React from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { useAction } from '@/context/action.context';



const Queue = () => {
    const {actions} = useAction()

    return (
        <div className="my-4">
            <h2 className="text-sm font-medium  mb-2">Liste d'attente :</h2>
            <ul className="flex flex-col md:flex-row justify-start flex-wrap">
            
            { actions && actions.length > 0 ? (
                <AnimatePresence>
                {[...actions].reverse().map((action,index) => (
                    <motion.li
                    key={index}
                    initial={{ x: 0, scale: 0, opacity: 0 }}
                    animate={{ x: 0, scale: 1, opacity: 1 }}
                    exit={{ x: "100%",  scale: 0.8, opacity: 0,}}
                    transition={{type: "spring", stiffness: 260, damping: 20}}
                    className={`shadow-md p-4 rounded-md mb-4 md:mb-0 md:m-2 bg-[#f0f0f0] text-sm font-small`}
                    >
                    {action.type.name}
                    </motion.li>
                ))}
                </AnimatePresence>
            ) : (
            <p className='text-sm font-small'>Veuillez ajoutez une action...</p>
            )}
            </ul>
        </div>
    );
};

export default Queue;