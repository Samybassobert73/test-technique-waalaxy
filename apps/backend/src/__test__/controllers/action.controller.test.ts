import 'reflect-metadata';
import ActionController from '../../controllers/action.controller';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

describe('CONTROLLER - ACTION', () => {
    
    let actionController: ActionController;

    const mReq = {} as Request;

    const mRes = {} as Response;

    mRes.status = jest.fn().mockReturnThis(),
    mRes.json = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        actionController = container.resolve(ActionController);
    });

    it('INSTANCE --> be defined', async () => {
        expect(actionController).toBeDefined();
    });

    it('POST /action --> response 200', async () => {
        const mBody = {
            credit: '663416ec0ef0018d54176bc7'
        }

        mReq.body = mBody;

        const mAction = {
            credit: {
                _id: '663416ec0ef0018d54176bc7',
                type: 'A'
            },
            _id: '6634a1f4f02650fcb2ce081f',
        };

        actionController.service.post = jest.fn().mockResolvedValue(mAction);

        await actionController.post(mReq, mRes);

        expect(actionController.service.post).toHaveBeenCalledTimes(1);
        expect(mRes.status).toHaveBeenCalledWith(200); 
        expect(mRes.json).toHaveBeenCalledWith(mAction); 
    });

    it('POST /action --> response 400 : credit should not be empty ', async () => {
        const mBody = {}

        mReq.body = mBody;

        await actionController.post(mReq, mRes);

        expect(actionController.service.post).not.toHaveBeenCalled(); 
        expect(mRes.status).toHaveBeenCalledWith(400); 
        expect(mRes.json).toHaveBeenCalledWith(expect.objectContaining(
            { errors: expect.arrayContaining([
                expect.objectContaining({
                    target: expect.objectContaining(mBody),
                    constraints: expect.objectContaining({
                        isNotEmpty: "credit should not be empty",
                    })
                })
            ])}
        ));
    });

    it('POST /action --> response 400 : credit must be a string', async () => {
        const mBody = { credit : 1 }

        mReq.body = mBody;

        await actionController.post(mReq, mRes);

        expect(actionController.service.post).not.toHaveBeenCalled(); 
        expect(mRes.status).toHaveBeenCalledWith(400); 
        expect(mRes.json).toHaveBeenCalledWith(expect.objectContaining(
            { errors: expect.arrayContaining([
                expect.objectContaining({
                    target: expect.objectContaining(mBody),
                    constraints: expect.objectContaining({
                        isString: "credit must be a string"
                    })
                })
            ])}
        ));
    });

    it('GET /action --> response 200', async () => {
        const mAction = {
            credit: {
                _id: '663416ec0ef0018d54176bc7',
                type: 'A'
            },
            _id: '6634a1f4f02650fcb2ce081f',
        };

        actionController.service.get = jest.fn().mockResolvedValue([mAction]);

        await actionController.get(mReq, mRes);

        expect(actionController.service.get).toHaveBeenCalledTimes(1);
        expect(mRes.status).toHaveBeenCalledWith(200); 
        expect(mRes.json).toHaveBeenCalledWith([mAction]); 
    });
    
});