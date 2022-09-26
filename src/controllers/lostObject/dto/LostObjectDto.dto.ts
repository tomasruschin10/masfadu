import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class lostObjectCreateDto {
    @ApiProperty()
    user_id:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    image: Express.Multer.File;
}

export class lostObjectUpdateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image: Express.Multer.File;
} 

export class lostObjectDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id:number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image: Express.Multer.File;
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}