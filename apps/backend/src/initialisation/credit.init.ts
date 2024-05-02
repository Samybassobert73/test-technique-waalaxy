import { inject, injectable } from 'tsyringe';
import CreditService from '../services/credit.service';
import TypeService from '../services/type.service';
import CreditSI from '../interfaces/credit.interface';

@injectable()
export default class CreditInit {

  constructor(
    @inject(CreditService)private creditService:CreditService,
    @inject(TypeService)private typeService:TypeService,	
  ){}

  execute = async ():Promise<CreditSI[]> => {
      const types = await this.typeService.get()
      const credits = await this.creditService.generateCredits(types)
      return await this.creditService.postMany(credits)  
  }
}


