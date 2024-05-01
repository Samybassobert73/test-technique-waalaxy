import { CronJob } from 'cron';
import { inject, injectable } from 'tsyringe';
import TimerService from '../services/timer.service';

@injectable()
export default class Timers {
	constructor(
        @inject(TimerService)private timerService:TimerService,
	){}

	init = () => {
		this.executeNextActionTimer();
        this.refreshCredit()
	};

	executeNextActionTimer = () => {
		const executeActionTimer = new CronJob(
			"*/15 * * * * *", // 15s
			async () => {
               const result = await this.timerService.executeNextAction()
               if(result){
                    const {removedAction, updatedcredit} = result;
                    console.log(removedAction, updatedcredit)
               }
			}, 
			null, 
			true,
			'Europe/Paris'
		);
	}

    refreshCredit = () => {
		const refreshCreditTimer = new CronJob(
			"*/15 * * * * *", // 15s
			async () => {
                const result = await this.timerService.refreshCredits()
                console.log('result',result);
			}, 
			null, 
			true,
			'Europe/Paris'
		);
	}


} 