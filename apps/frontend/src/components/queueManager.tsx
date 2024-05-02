import React from 'react'
import Actionform from '@/components/action.form'
import Credit from '@/components/credits'
import Queue from '@/components/queue'
const QueueManager = () => {
    

  return (
    
      <div className="container mx-auto p-2 bg-white shadow-md max-w-[600px]">
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