import React, { useEffect } from 'react'
import Actionform from '@/components/action.form'
import Credit from '@/components/credits'
import Queue from '@/components/queue'
import { useAction } from '@/context/action.context'
import { getActions } from '@/client/api'
import ActionI  from '@/interfaces/action.interface'
const QueueManager = () => {
    const {setActions} = useAction()

    useEffect(() => {
        getActions().then((data:ActionI[]) => {
            setActions(data)
        });
    }, []);

  return (
    
      <div className="container mx-auto p-2 bg-white shadow-md max-w-[500px]">
        <div className="bg-[#eef1fc] rounded-lg p-6 ">
        <Credit/>
        <hr className="h-0.3 bg-gray-400 rounded-lg my-4" />
        <Actionform/>
        <Queue/>
        </div>
      </div>
    
  )
}

export default QueueManager