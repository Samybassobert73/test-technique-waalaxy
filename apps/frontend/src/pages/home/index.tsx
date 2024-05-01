import Actionform from '@/components/action.form'
import Credit from '@/components/credits'
import React from 'react'
const Index = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#eef1fc]">
      <div className="container mx-auto p-2 bg-white shadow-md max-w-[500px]">
        <div className="bg-[#eef1fc] rounded-lg p-6 ">
        <Credit/>
        <hr className="h-0.3 bg-gray-400 rounded-lg my-4" />
        <Actionform/>
        </div>
      </div>
    </div>
  )
}

export default Index