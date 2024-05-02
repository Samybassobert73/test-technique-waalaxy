import QueueManager from '@/components/queueManager'
import { ActionProvider } from '@/context/action.context'

const Index = () => {
    
  return (
    <div className="flex items-center justify-center h-screen bg-[#eef1fc]">
      <ActionProvider>
        <QueueManager/>
      </ActionProvider>
    </div>
  )
}

export default Index