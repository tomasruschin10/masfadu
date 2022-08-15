import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class partnerCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string
} 

export class partnerDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;   
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}