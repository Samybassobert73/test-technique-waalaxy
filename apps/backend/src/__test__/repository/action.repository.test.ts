import 'reflect-metadata';
import { container } from 'tsyringe';
import ActionRepository from '../../repository/action.repository';
import mongoose, { PipelineStage } from 'mongoose';
import { ActionI } from '../../interfaces/action.interface';
import e from 'express';

describe('REPOSITORY - ACTION', () => {

    let actionRepository: ActionRepository;
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        actionRepository = container.resolve(ActionRepository);
    });

    it('INSTANCE --> be defined', async () => {
        expect(actionRepository).toBeDefined();
    });

    it('FIND --> call the model and return actions array', async () => {
        let mAction = {
            _id: '663416ec0ef0018d54176bc7',
            credit: {
                _id: '663416ec0ef0018d54176bc7',
                type: 'A',
            }
        };

        jest
        .spyOn(actionRepository.model, "find")
        .mockReturnThis();
        

        actionRepository.model.populate = jest.fn().mockResolvedValue([mAction]);

        const actions = await actionRepository.find();

        expect(actionRepository.model.find).toHaveBeenCalledTimes(1);
        expect(actionRepository.model.populate).toHaveBeenCalledTimes(1);
        expect(actions).toEqual([mAction]);
    });

    it('CREATE --> call the model and return actions object', async () => { 
        const mCreditId = '663416ec0ef0018d54176bc7';
        const mData = { credit: mCreditId };

        let mAction = {
            _id: '6634a1f4f02650fcb2ce081f',
            credit: {
                _id: '663416ec0ef0018d54176bc7',
                type: 'A'
            }
        };

        jest
        .spyOn(actionRepository.model, "create")
        .mockReturnThis();

        actionRepository.model.populate = jest.fn().mockResolvedValue(mAction);

        const actions = await actionRepository.create(mData);

        expect(actions).toEqual(mAction);
        expect(actionRepository.model.create).toHaveBeenCalledTimes(1);
        expect(actionRepository.model.populate).toHaveBeenCalledTimes(1);
        expect(actionRepository.model.create).toHaveBeenCalledWith(mData);
    });

    it('FIND ONE --> call the model and return actions object with filter ', async () => { 
        const filter = {}

        let mAction = {
            _id: '6634a1f4f02650fcb2ce081f'
        };

        jest
        .spyOn(actionRepository.model, "findOne")
        .mockResolvedValue(mAction);

        const actions = await actionRepository.findOne(filter);

        expect(actions).toEqual(mAction);
        expect(actionRepository.model.findOne).toHaveBeenCalledTimes(1); 
        expect(actionRepository.model.findOne).toHaveBeenCalledWith(filter);  
    });

    it('FIND BY ID --> call the model and return actions object with id', async () => { 
        const mActionId = '6634a1f4f02650fcb2ce081f';

        let mAction = {
            _id: '6634a1f4f02650fcb2ce081f'
        };

        jest
        .spyOn(actionRepository.model, "findById")
        .mockResolvedValue(mAction);

        const actions = await actionRepository.findById(mActionId);

        expect(actions).toEqual(mAction);
        expect(actionRepository.model.findById).toHaveBeenCalledTimes(1);
        expect(actionRepository.model.findById).toHaveBeenCalledWith({_id:new mongoose.Types.ObjectId(mActionId)});
    });

    it('FIND BY ID AND DELETE --> call the model and return actions object by id', async () => {
        const mActionId = '6634a1f4f02650fcb2ce081f';

        let mAction = {
            _id: '6634a1f4f02650fcb2ce081f'
        };

        jest
        .spyOn(actionRepository.model, "findByIdAndDelete")
        .mockResolvedValue(mAction);

        const actions = await actionRepository.findByIdAndDelete(mActionId);

        expect(actions).toEqual(mAction);
        expect(actionRepository.model.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(actionRepository.model.findByIdAndDelete).toHaveBeenCalledWith({_id:new mongoose.Types.ObjectId(mActionId)});
  
    });

    it('AGGREGATE --> call the model and return actions array', async () => {
        const mPipeline: PipelineStage[] = [];

        let mAction = {
            _id: '663416ec0ef0018d54176bc7',
        };

        actionRepository.model.aggregate = jest.fn().mockReturnThis();
        actionRepository.model.aggregate().exec = jest.fn().mockResolvedValue([mAction]);

        const actions = await actionRepository.aggregate(mPipeline);

        expect(actionRepository.model.aggregate().exec).toHaveBeenCalledTimes(1);
        expect(actions).toEqual([mAction]);
    })
});