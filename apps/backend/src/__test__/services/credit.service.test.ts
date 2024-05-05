import 'reflect-metadata';
import { container } from 'tsyringe';
import CreditService from '../../services/credit.service';
import { Type } from 'class-transformer';
import CreditSI, { CreditI } from '../../interfaces/credit.interface';
import exp from 'constants';

describe('action repository test', () => {

    let creditService: CreditService;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        creditService = container.resolve(CreditService);
    });

    it('INSTANCE --> be defined', async () => {
        expect(creditService).toBeDefined();
    });

    it('CREDIT VALUE --> between 80% and 100% of max value', async () => {
        expect(creditService.generateCreditValue()).toBeGreaterThanOrEqual(0.8 * creditService['MAX_VALUE']);
        expect(creditService.generateCreditValue()).toBeLessThanOrEqual(creditService['MAX_VALUE']);   
    });

    it('CREDIT VALUE --> -1', async () => {
        const value = 10;
        const mCredit = {} as CreditSI;
        mCredit.value = value;
        mCredit.save  = jest.fn().mockReturnThis()  
        const result = await creditService.decrementCredit(mCredit)
        expect(result.value).toBe(value -1)
    });

    it('REFRESH CREDIT VALUE --> greater than 0', async () => {
        const mCredit = {} as CreditSI;
        mCredit.value = 0;
        mCredit.save  = jest.fn().mockReturnThis() 
        const result = await creditService.refreshCredit(mCredit, 10)
        expect(result.value).toBeGreaterThan(0)
    });

    it('REFRESH EACH CREDITS VALUE --> between 80% and 100% of max value', async () => {
        const mCreditArray = [] as CreditSI[];
        const mCredit = {} as CreditSI;
        mCredit.value = 0;
        mCredit.save  = jest.fn().mockReturnThis() 
        mCreditArray.push(mCredit)

        const result = await creditService.refreshCredits(mCreditArray)
        result.forEach(credit => {
            expect(credit.value).toBeGreaterThanOrEqual(0.8 * creditService['MAX_VALUE']);
            expect(credit.value).toBeLessThanOrEqual(creditService['MAX_VALUE']);
        })
    });


    //... meme chose que pour action.service.test.ts pour les action generice post, get, getOne etc...
 
});