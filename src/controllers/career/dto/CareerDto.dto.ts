import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class careerCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    description_url: string;

    @ApiProperty()
    image: Express.Multer.File
}

export class careerUpdateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description_url: string;

    @ApiProperty()
    image: Express.Multer.File
} 

export class careerDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string

    @ApiProperty()
    description_url: string

    @ApiProperty()
    image_id: number
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}