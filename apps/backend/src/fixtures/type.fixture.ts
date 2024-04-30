import { faker } from '@faker-js/faker';
import TypeModel from '../models/type.model';
import { container } from 'tsyringe';

const typeModel = container.resolve(TypeModel);

export const createFixtures = async (number:number): Promise<void> => {
    try {
        const count = await typeModel.model.countDocuments();
        if(count < number){
            const fakeTypes = generateTypes(number - count) 
            const insertedTypes = await typeModel.model.insertMany(fakeTypes);
            console.log(`${insertedTypes} types have been inserted into the database.`);
            return;
        }
        console.log("Types already exist in the database.");
        return;
    } catch (error) {
        console.error("Error creating fixtures:", error);
    }
};

const generateTypes = (num:number): {name:string}[]=> {
    const types = [];

    for (let i = 0; i < num; i++) {
        const name = faker.string.alpha({ length: 1, casing: 'upper'}) 

        types.push({
            name,
        });
    }
    
    return types;
};


