import 'reflect-metadata';
import { container } from 'tsyringe';
import ActionService from '../../services/action.service';
import ActionSI from '../../interfaces/action.interface';
describe('action repository test', () => {

    let actionService: ActionService;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        actionService = container.resolve(ActionService);
    });

    it('INSTANCE --> be defined', async () => {
        expect(actionService).toBeDefined();
    });

    it('POST --> call repository and create an action', async () => {
        const mData = { credit: '663416ec0ef0018d54176bc7' }
        const mAction = {
            credit: {
                _id: '663416ec0ef0018d54176bc7',
                type: 'A'
            },
            _id: '6634a1f4f02650fcb2ce081f',
        }

        actionService.repository.create = jest.fn().mockResolvedValue(mAction);

        const action = await actionService.post(mData);

        expect(actionService.repository.create).toHaveBeenCalledTimes(1);
        expect(action).toEqual(mAction);
    })


    it('GET --> call repository and return an array of action', async () => {
        const mData = { credit: '663416ec0ef0018d54176bc7' }
        const mAction = {
            credit: {
                _id: '663416ec0ef0018d54176bc7',
                type: 'A'
            },
            _id: '6634a1f4f02650fcb2ce081f',
        }

        actionService.repository.find = jest.fn().mockResolvedValue([mAction]);

        const action = await actionService.get();

        expect(actionService.repository.find).toHaveBeenCalledTimes(1);
        expect(action).toEqual([mAction]);

    });

    it('GET ONE --> call repository and return an action with filter', async () => {
        const filter = {}

        const mAction = {
            _id: '6634a1f4f02650fcb2ce081f',
        }

        actionService.repository.findOne = jest.fn().mockResolvedValue(mAction);

        const action = await actionService.getOne(filter);

        expect(actionService.repository.findOne).toHaveBeenCalledTimes(1);
        expect(actionService.repository.findOne).toHaveBeenCalledWith(filter);
        expect(action).toEqual(mAction);

    });

    it('GET BY ID --> call repository and return an action with id', async () => {
        const mActionId = '6634a1f4f02650fcb2ce081f';
        const mAction = {
            _id: '6634a1f4f02650fcb2ce081f',
        }

        actionService.repository.findById = jest.fn().mockResolvedValue(mAction);

        const action = await actionService.getById(mActionId);

        expect(actionService.repository.findById).toHaveBeenCalledTimes(1);
        expect(actionService.repository.findById).toHaveBeenCalledWith(mActionId);
        expect(action).toEqual(mAction);
    });

    it('DELETE --> call repository and return a deleted action by id', async () => {
        const mActionId = '6634a1f4f02650fcb2ce081f';
        const mAction = {
            _id: '6634a1f4f02650fcb2ce081f',
        }

        actionService.repository.findByIdAndDelete = jest.fn().mockResolvedValue(mAction);

        const action = await actionService.delete(mActionId);

        expect(actionService.repository.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(actionService.repository.findByIdAndDelete).toHaveBeenCalledWith(mActionId);
        expect(action).toEqual(mAction);
    });

    it('AGGREGATE --> call repository aggregate method with pipeline and return result', async () => {
        const mockFilter = [{ $match: { name: 'Resource' } }];
        const mockResult = [{ id: '1', name: 'Resource' }];

        jest
        .spyOn(actionService.repository, 'aggregate')
        .mockReturnValue([mockResult] as any);

        const result = await actionService.aggregate(mockFilter);
    
        expect(actionService.repository.aggregate).toHaveBeenCalledWith(mockFilter);
        expect(result).toEqual([mockResult]);
      });


});