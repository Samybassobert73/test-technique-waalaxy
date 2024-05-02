import { container } from 'tsyringe';
import CreditInit from './credit.init';

//InitCredits
const creditInit = container.resolve(CreditInit);

export const initCredits = () => {
    creditInit.execute();
}