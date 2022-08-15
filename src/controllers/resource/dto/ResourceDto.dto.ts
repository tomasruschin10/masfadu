import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class resourceCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty()
    @IsNotEmpty()
    subject_id: number;

    @ApiProperty()
    @IsNotEmpty()
    resource_category_id: number;

    @ApiProperty()
    image: Express.Multer.File
}

export class resourceUpdateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    subject_id: number;

    @ApiProperty()
    resource_category_id: number;

    @ApiProperty()
    image: Express.Multer.File
} 

export class resourceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    subject_id: number;

    @ApiProperty()
    resource_category_id: number;

    @ApiProperty()
    image_id: number
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}