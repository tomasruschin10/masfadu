import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class opinionAnswerCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;   

    @ApiProperty()
    @IsNotEmpty()
    opinion_id: number;
} 


export class opinionAnswerUpdateDto {
    @ApiProperty()
    description: string;
} 

export class opinionAnswerDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    description: string;   

    @ApiProperty()
    student_id: number;

    @ApiProperty()
    opinion_id: number;
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}