import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class configCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    key: string

    @ApiProperty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    value: string
} 

export class configDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    key: string

    @ApiProperty()
    name: string

    @ApiProperty()
    value: string  
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}