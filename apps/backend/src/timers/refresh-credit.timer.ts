import { inject, injectable } from 'tsyringe';
import CreditService from '../services/credit.service';
import { io } from '../websocket/websocket';

@injectable()
export default class RefreshCreditTimers {

	REFRESH_CREDIT_MESSAGE:string = 'refresh-credit';

	constructor(
		@inject(CreditService)private creditService:CreditService,
	){}

	init = () => {
		setInterval(() => { this.execute()},10 * 60 * 1000); //10min
	}

    execute = async (): Promise<void> => {
		const credits = await this.creditService.get()
        const newCredits = await this.creditService.refreshCredits(credits)	
		io.emit(this.REFRESH_CREDIT_MESSAGE.toString(), JSON.stringify(newCredits));
	}
  
} 