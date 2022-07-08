import { ApiProperty } from '@nestjs/swagger';

export class roleCreateDto {
    @ApiProperty()
    name: string
} 

export class roleDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;   
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}