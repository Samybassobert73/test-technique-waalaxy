import { container } from 'tsyringe';
import RefreshCreditTimers from './refresh-credit.timer';
import ExecuteActionTimer from './execute-action.timer';

//RefreshCreditTimers
const refreshCreditTimers = container.resolve(RefreshCreditTimers);

//ExecuteActionTimer
const executeActionTimers = container.resolve(ExecuteActionTimer);

export const initTimers = () => {
    refreshCreditTimers.init(10 * 60 * 1000);
    executeActionTimers.init(15 * 1000);
}
