import QueueManager from '@/components/queueManager'
import { ActionProvider } from '@/context/action.context'
import { CreditProvider } from '@/context/credit.context'

const Index = () => {
    
  return (
    <div className="flex items-center justify-center h-screen bg-[#eef1fc]">
      <CreditProvider>
        <ActionProvider>
          <QueueManager/>
        </ActionProvider>
      </CreditProvider>
    </div>
  )
}

export default Index