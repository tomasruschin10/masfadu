import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class noticeCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    image: Express.Multer.File

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date_start: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date_end: Date;
} 

export class noticeUpdateDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    image: Express.Multer.File

    @ApiProperty()
    date_start: Date;

    @ApiProperty()
    date_end: Date;
} 

export class noticeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string
    
    @ApiProperty()
    image: Express.Multer.File

    @ApiProperty()
    date_start: Date;

    @ApiProperty()
    date_end: Date; 
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}