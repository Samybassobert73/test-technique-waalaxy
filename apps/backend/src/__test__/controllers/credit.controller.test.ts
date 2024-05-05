import 'reflect-metadata';
import { Request, Response } from 'express';
import CreditController from '../../controllers/credit.controller';
import { container } from 'tsyringe';


describe('CONTROLLER - CREDIT', () => {
    
    let creditController: CreditController;

    const mReq = {} as Request;

    const mRes = {} as Response;

    mRes.status = jest.fn().mockReturnThis(),
    mRes.json = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        creditController = container.resolve(CreditController);
    });

    it('INSTANCE --> be defined', async () => {
        expect(creditController).toBeDefined();
    });

    it('GET /credit --> response 200', async () => {
        const mCredit = {
            _id: '663416ec0ef0018d54176bc7',
            type: 'A',
            value: 10
        };

        creditController.service.get = jest.fn().mockResolvedValue([mCredit]);

        await creditController.get(mReq, mRes);

        expect(creditController.service.get).toHaveBeenCalledTimes(1);
        expect(mRes.status).toHaveBeenCalledWith(200); 
        expect(mRes.json).toHaveBeenCalledWith([mCredit]); 
    });
});