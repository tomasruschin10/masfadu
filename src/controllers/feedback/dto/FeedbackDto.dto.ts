import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class feedbackCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
} 

export class feedbackUpdateDto {
    @ApiProperty()
    user_id: number

    @ApiProperty()
    description: string
} 

export class feedbackDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: number;  

    @ApiProperty()
    description: string;   
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}