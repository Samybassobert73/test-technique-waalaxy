import CreditModel from '../models/credit.model';
import { container } from 'tsyringe';
import TypeModel from '../models/type.model';
import TypeSI from '../interfaces/type.interface';

const creditModel = container.resolve(CreditModel);
const typeModel = container.resolve(TypeModel);
const MAX_VALUE = 10;

export const createFixtures = async (): Promise<void> => {
    const types = await typeModel.model.find()
    const credits = await generateCredits(types)
    const newCredits = await creditModel.model.insertMany(credits)
    return;
};

const generateCredits = async (types: TypeSI[]) => {
    const credits = []
    for(const type of types){
    
        const doublons = await creditModel.model.findOne({type: type._id})
        
        if(!doublons){
            const value = generateCreditValue(MAX_VALUE)
            const credit = generateCredit(type, value)
            credits.push(credit)
        }
    }
    return credits
}

const generateCreditValue = (maxValue:number): number => {
    const minRange = maxValue * 0.8;
    const maxRange = maxValue;
    let randomNumber = Math.random() * (maxRange - minRange) + minRange;
    randomNumber = Math.round(randomNumber);
    return randomNumber
}

const generateCredit = (type, value:number) => {
    const credit = {
        type: type._id,
        value: value
    }
    return credit
};


