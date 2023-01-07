import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class generalNotificationCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
} 

export class generalNotificationDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string

    @ApiProperty()
    description: string 
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}