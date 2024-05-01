import QueueManager from '@/components/queueManager'
import { ActionProvider } from '@/context/action.context'

const Index = () => {
    
  return (
    <ActionProvider>
        <div className="flex items-center justify-center h-screen bg-[#eef1fc]">
            <QueueManager/>
        </div>
    </ActionProvider>
  )
}

export default Index