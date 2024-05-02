import { container } from 'tsyringe';
import RefreshCreditTimers from './refresh-credit.timer';
import ExecuteActionTimer from './execute-action.timer';

//RefreshCreditTimers
const refreshCreditTimers = container.resolve(RefreshCreditTimers);

//ExecuteActionTimer
const executeActionTimer = container.resolve(ExecuteActionTimer);

export const initTimers = () => {
    refreshCreditTimers.init();
    executeActionTimer.init();
}
