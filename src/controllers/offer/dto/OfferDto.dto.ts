import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class offerCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    point: number;

    @ApiProperty()
    @IsNotEmpty()
    offer_category_id: number;

    @ApiProperty()
    @IsNotEmpty()
    partner_id: number

    @ApiProperty()
    @IsNotEmpty()
    career_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty()
    image: Express.Multer.File
}

export class offerUpdateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    point: number;

    @ApiProperty()
    offer_category_id: number;

    @ApiProperty()
    partner_id: number

    @ApiProperty()
    career_id: number

    @ApiProperty()
    description: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    image: Express.Multer.File
} 

export class offerDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    point: number;

    @ApiProperty()
    offer_category_id: number;

    @ApiProperty()
    partner_id: number

    @ApiProperty()
    career_id: number

    @ApiProperty()
    description: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    image_id: number
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}