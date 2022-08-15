import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class subjectCategoryCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    career_id: number;
} 

export class subjectCategoryUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    career_id: number;
} 

export class subjectCategoryDto {
    @ApiProperty()
    id: number; 

    @ApiProperty()
    name: string;  
    
    @ApiProperty()
    career_id: number;
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}