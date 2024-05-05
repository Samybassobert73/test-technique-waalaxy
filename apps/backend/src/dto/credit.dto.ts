import { IsNotEmpty, IsString, IsNumber} from 'class-validator';
import { Transform } from 'class-transformer';

export default class CreditDTO {
    @IsString()
    @IsNotEmpty()
    @Transform(value => value.toString())
    type:string

    @IsNumber()
    @IsNotEmpty()
    value:number

    constructor(type:string, value:number){
        this.type = type;
        this.value = value
    }
}