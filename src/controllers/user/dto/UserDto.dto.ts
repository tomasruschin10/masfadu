import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../models/userRole.entity';

export class userDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    password: string;
  
    @ApiProperty()
    name: string;    
  
    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date

    role: UserRole;
}