import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class tagCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class tagUpdateDto {
    @ApiProperty()
    name: string;
} 

export class tagDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}