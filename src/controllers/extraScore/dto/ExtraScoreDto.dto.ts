import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class extraScoreCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    score: number;

    @ApiProperty()
    @IsNotEmpty()
    user_subject_id: number;
}

export class extraScoreDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    score: number;

    @ApiProperty()
    user_subject_id: number;

    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}