import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class offerCategoryCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // career_id: number;
} 

export class offerCategoryUpdateDto {
    @ApiProperty()
    name: string

    // @ApiProperty()
    // career_id: number;
} 

export class offerCategoryDto {
    @ApiProperty()
    id: number; 

    @ApiProperty()
    name: string;  
    
    // @ApiProperty()
    // career_id: number;
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}