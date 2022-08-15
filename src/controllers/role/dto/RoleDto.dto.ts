import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class roleCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string
} 

export class roleDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;   
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}