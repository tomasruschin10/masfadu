import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { OpinionTag } from 'src/models/opinionTag.entity';

export class opinionCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    student_id: number;

    @ApiProperty()
    @IsNotEmpty()
    subject_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    tags: [];

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    professor: string;
}

export class opinionUpdateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    student_id: number;

    @ApiProperty()
    subject_id: number;

    @ApiProperty()
    professor: string;
} 

export class opinionDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    student_id: number;

    @ApiProperty()
    subject_id: number;

    @ApiProperty()
    professor: string;
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}