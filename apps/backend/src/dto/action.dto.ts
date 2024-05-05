import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export default class ActionDTO {
    @IsString()
    @IsNotEmpty()
    @Transform(value => value.toString())
    credit: string;

    constructor(credit:string){
        this.credit = credit;
    }
}