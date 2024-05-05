import 'reflect-metadata';
import { container } from 'tsyringe';
import RefreshCreditTimers from '../../timers/refresh-credit.timer';
import { io } from '../../websocket/websocket';
import CreditSI from '../../interfaces/credit.interface';

describe('action controller test', () => {

    let refreshCreditTimers: RefreshCreditTimers

    jest.useFakeTimers();

    beforeAll(() => {
        refreshCreditTimers = container.resolve(RefreshCreditTimers);
    });
  
    it('INSTANCE --> be defined', async () => {
        expect(refreshCreditTimers).toBeDefined();
    });

    it('EXECUTE TIMER --> call execute function after 10 minutes', () => {
        const delaySpy = jest.spyOn(refreshCreditTimers, 'execute');
        refreshCreditTimers.init(10 * 60 * 1000);
        jest.advanceTimersByTime(10 * 60 * 1000);
        expect(delaySpy).toHaveBeenCalled();
    })

    it('EXECUTE REFRESH CREDIT --> should call refresh credits and emit a message', async () => {
        const mCredits = [{ id: '1', value: 0 }, { id: '2', value: 0 }] as CreditSI[];
        const mNewCredits = [{ id: '1', value: 11 }, { id: '2', value: 10 }] as CreditSI[];
        

        const getCreditsSpy = jest.spyOn(refreshCreditTimers['creditService'], 'get').mockResolvedValue(mCredits);
        const refreshCreditsSpy = jest.spyOn(refreshCreditTimers['creditService'], 'refreshCredits').mockResolvedValue(mNewCredits);
        const emitSpy = jest.spyOn(io, 'emit');

        await refreshCreditTimers.execute();
        
        expect(getCreditsSpy).toHaveBeenCalledTimes(1);
        expect(refreshCreditsSpy).toHaveBeenCalledTimes(1);
        expect(refreshCreditsSpy).toHaveBeenCalledWith(mCredits);
        expect(emitSpy).toHaveBeenCalledWith(refreshCreditTimers.REFRESH_CREDIT_MESSAGE.toString(), JSON.stringify(mNewCredits));
  
    })
});