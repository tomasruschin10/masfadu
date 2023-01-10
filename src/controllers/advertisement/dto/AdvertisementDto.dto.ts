import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class advertisementCreateDto {
    @ApiProperty()
    image: Express.Multer.File

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string

    @ApiProperty()
    key: string

    @ApiProperty()
    @IsNotEmpty()
    career_id: number

    @ApiProperty()
    @IsNotEmpty()
    partner_id: number

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date_start: Date;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date_end: Date;
}

export class advertisementUpdateDto {
    @ApiProperty()
    image: Express.Multer.File

    @ApiProperty()
    url: string

    @ApiProperty()
    key: string

    @ApiProperty()
    career_id: number

    @ApiProperty()
    partner_id: number

    @ApiProperty()
    date_start: Date;

    @ApiProperty()
    date_end: Date;
} 

export class advertisementDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    image_id: number

    @ApiProperty()
    url: string

    @ApiProperty()
    key: string

    @ApiProperty()
    partner_id: number

    @ApiProperty()
    date_start: Date;

    @ApiProperty()
    date_end: Date; 
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}