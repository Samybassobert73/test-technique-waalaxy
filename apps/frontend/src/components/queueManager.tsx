import React from 'react'
import Actionform from '@/components/actionForm'
import BadgeList from '@/components/badgeList'
import QueueList from '@/components/queueList'
const QueueManager = () => {
    

  return (
    
      <div className="container mx-auto p-2 bg-white shadow-md max-w-[600px]">
        <div className="bg-[#eef1fc] rounded-lg p-6 ">
        <BadgeList/>
        <hr className="h-0.3 bg-gray-400 rounded-lg my-4" />
        <Actionform/>
        <QueueList/>
        </div>
      </div>
    
  )
}

export default QueueManager