import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class balanceCreateDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    amount: number

    @ApiProperty()
    @IsNotEmpty()
    offer_id: number
}

export class balanceUpdateDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    amount: number

    @ApiProperty()
    offer_id: number
} 

export class balanceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    amount: number

    @ApiProperty()
    offer_id: number
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}