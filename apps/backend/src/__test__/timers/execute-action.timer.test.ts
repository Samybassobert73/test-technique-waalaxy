import 'reflect-metadata';
import { container } from 'tsyringe';
import ExecuteActionTimer from '../../timers/execute-action.timer';
import { io } from '../../websocket/websocket';
import CreditSI from '../../interfaces/credit.interface';
import ActionSI from '../../interfaces/action.interface';
import { Schema } from 'mongoose';


describe('TIMER - EXECUTE ACTION', () => {

    let executeActionTimer: ExecuteActionTimer; 

    jest.useFakeTimers();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    beforeAll(() => {
        executeActionTimer = container.resolve(ExecuteActionTimer);
    });

    it('INSTANCE --> be defined', async () => {
        expect(executeActionTimer).toBeDefined();
    });

    it('EXECUTE TIMER --> call execute function after 15seconds', () => {
        const milliseconds = 10 * 60 * 1000;
        const delaySpy = jest.spyOn(executeActionTimer, 'execute');
        executeActionTimer.init(milliseconds);
        jest.advanceTimersByTime(milliseconds);
        expect(delaySpy).toHaveBeenCalled();
    })

    it('EXECUTE ACTION --> remove action, decrement credit and emit a message', async () => {
        const mA:ActionSI = {} as ActionSI;
        const mAction: ActionSI[] = [mA];

        const mRemovedAction:ActionSI = {} as ActionSI;
        mRemovedAction.credit = new Schema.Types.ObjectId('1');

        const mCredit = { id: '1', type: "A", value: 10 } as CreditSI;
        const mDecrementedCredit = { id: '1', type: "A", value: 9 } as CreditSI;

        const actionAggregateSpy = jest.spyOn(executeActionTimer['actionService'], 'aggregate').mockResolvedValue(mAction);
        const actionDeleteSpy = jest.spyOn(executeActionTimer['actionService'], 'delete').mockResolvedValue(mRemovedAction);
        const creditGetByIdSpy = jest.spyOn(executeActionTimer['creditService'], 'getById').mockResolvedValue(mCredit);
        const decrementCreditSpy = jest.spyOn(executeActionTimer['creditService'], 'decrementCredit').mockResolvedValue(mDecrementedCredit);
        const emitSpy = jest.spyOn(io, 'emit');
    
        await executeActionTimer.execute();
        
        expect(actionAggregateSpy).toHaveBeenCalledTimes(1);
        expect(actionDeleteSpy).toHaveBeenCalledTimes(1);
        expect(creditGetByIdSpy).toHaveBeenCalledTimes(1);
        expect(decrementCreditSpy).toHaveBeenCalledTimes(1);

        expect(emitSpy).toHaveBeenCalledTimes(2);
        expect(emitSpy).toHaveBeenCalledWith(executeActionTimer.DECREMENT_CREDIT_MESSAGE.toString(), JSON.stringify(mDecrementedCredit));
        expect(emitSpy).toHaveBeenCalledWith(executeActionTimer.REMOVE_ACTION_MESSAGE.toString(), JSON.stringify(mRemovedAction));

    })

    it('EXECUTE ACTION --> if no action --> no decrement credit and no emit a message', async () => {
        const mAction: ActionSI[] = [];

        const ActionAggregateSpy = jest.spyOn(executeActionTimer['actionService'], 'aggregate').mockResolvedValue(mAction);
        const DeletedActionSpy = jest.spyOn(executeActionTimer['actionService'], 'delete').mockResolvedValue({} as ActionSI);
        const getCreditSpy = jest.spyOn(executeActionTimer['creditService'], 'getById').mockResolvedValue({} as CreditSI);
        const DecrementCreditSpy = jest.spyOn(executeActionTimer['creditService'], 'decrementCredit').mockResolvedValue({} as CreditSI);
        const IoEmitSpy = jest.spyOn(io, 'emit');
    
        await executeActionTimer.execute();
        
        expect(ActionAggregateSpy).toHaveBeenCalledTimes(1);
        expect(DeletedActionSpy ).not.toHaveBeenCalled();
        expect(getCreditSpy ).not.toHaveBeenCalled();
        expect(DecrementCreditSpy).not.toHaveBeenCalled();
        expect(IoEmitSpy).not.toHaveBeenCalled();
    })
});