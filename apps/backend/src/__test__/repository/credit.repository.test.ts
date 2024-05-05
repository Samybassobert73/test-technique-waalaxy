import 'reflect-metadata';
import { container } from 'tsyringe';
import CreditRepository from '../../repository/credit.repository';
import mongoose, { PipelineStage } from 'mongoose';

describe('REPOSITORY - CREDIT', () => {

    let creditRepository: CreditRepository;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        creditRepository = container.resolve(CreditRepository);
    });

    it('INSTANCE --> be defined', async () => {
        expect(creditRepository).toBeDefined();
    });

    it('FIND --> call the model and return credits array', async () => {
        const mCredit = {
            _id: '663416ec0ef0018d54176bc7',
            type: 'A',
            value: 10,
        };

        jest
        .spyOn(creditRepository.model, "find")
        .mockResolvedValue([mCredit]);

        const credits = await creditRepository.find();

        expect(creditRepository.model.find).toHaveBeenCalledTimes(1);
        expect(credits).toEqual([mCredit]);
    });

    it('CREATE --> call the model and return credit object', async () => { 
        const mCredit = {
            _id: '663416ec0ef0018d54176bc7',
            type: 'A',
            value: 10,
        };

        const mData = { type: 'A', value: 10};

        creditRepository.model.create = jest.fn().mockResolvedValue(mCredit);

        const credits = await creditRepository.create(mData);

        expect(credits).toEqual(mCredit);
        expect(creditRepository.model.create).toHaveBeenCalledTimes(1);
        expect(creditRepository.model.create).toHaveBeenCalledWith(mData);
    });

    it('FIND ONE --> call the model and return credit object with filter', async () => { 
        const filter = {};

        let mCredit = {
            _id: '663416ec0ef0018d54176bc7',
            type: 'A',
            value: 10,
        };

        jest
        .spyOn(creditRepository.model, "findOne")
        .mockResolvedValue(mCredit);

        const credits = await creditRepository.findOne(filter);

        expect(credits).toEqual(mCredit);
        expect(creditRepository.model.findOne).toHaveBeenCalledTimes(1); 
        expect(creditRepository.model.findOne).toHaveBeenCalledWith(filter);  
    });

    it('FIND BY ID --> call the model and return credit object by id', async () => { 
        const mCreditId = '6634a1f4f02650fcb2ce081f';

        let mCredit = {
            _id: '6634a1f4f02650fcb2ce081f',
            type: 'A',
            value: 10,
        };

        jest
        .spyOn(creditRepository.model, "findById")
        .mockResolvedValue(mCredit);

        const credits = await creditRepository.findById(mCreditId);

        expect(credits).toEqual(mCredit);
        expect(creditRepository.model.findById).toHaveBeenCalledTimes(1);
        expect(creditRepository.model.findById).toHaveBeenCalledWith({_id:new mongoose.Types.ObjectId(mCreditId)});
    });

    it('FIND BY ID AND DELETE -->  call the model and return deleted credit object by id', async () => {
        const mCreditId = '6634a1f4f02650fcb2ce081f';

        let mCredit = {
            _id: '6634a1f4f02650fcb2ce081f',
            type: 'A',
            value: 10,
        };

        jest
        .spyOn(creditRepository.model, "findByIdAndDelete")
        .mockResolvedValue(mCredit);

        const credits = await creditRepository.findByIdAndDelete(mCreditId);

        expect(credits).toEqual(mCredit);
        expect(creditRepository.model.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(creditRepository.model.findByIdAndDelete).toHaveBeenCalledWith({_id:new mongoose.Types.ObjectId(mCreditId)});
  
    });

    it('AGGREGATE --> credits array by pipeline', async () => {
        const mPipeline: PipelineStage[] = [];
        
        let mCredits = {
            _id: '663416ec0ef0018d54176bc7',
            type: 'A',
            value: 10,
        };

        creditRepository.model.aggregate = jest.fn().mockReturnThis();
        creditRepository.model.aggregate().exec = jest.fn().mockResolvedValue([mCredits]);

        const actions = await creditRepository.aggregate(mPipeline);

        expect(creditRepository.model.aggregate().exec).toHaveBeenCalledTimes(1);
        expect(actions).toEqual([mCredits]);
    })
});