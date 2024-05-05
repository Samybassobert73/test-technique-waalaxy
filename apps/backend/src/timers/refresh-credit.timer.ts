import { inject, injectable } from 'tsyringe';
import CreditService from '../services/credit.service';
import { io } from '../websocket/websocket';
import BaseTimer from './base.timer';

@injectable()
export default class RefreshCreditTimers extends BaseTimer {

	REFRESH_CREDIT_MESSAGE:string = 'refresh-credit';

	creditService:CreditService;
	
	constructor(
		@inject(CreditService)creditService:CreditService,
	){
		super();
		this.creditService = creditService;
	}

    execute = async (): Promise<void> => {
		const credits = await this.creditService.get()
        const newCredits = await this.creditService.refreshCredits(credits)	
		io.emit(this.REFRESH_CREDIT_MESSAGE.toString(), JSON.stringify(newCredits));
	}
  
} 