import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../../../models/image.entity';
import { Role } from '../../../models/role.entity';

export class authRegisterDto {
    @ApiProperty()
    username:string

    @ApiProperty()
    password:string

    @ApiProperty()
    name: string

    @ApiProperty()
    role_id: number
} 
export class authUpdateDto {
    @ApiProperty()
    username:string

    @ApiProperty()
    password:string

    @ApiProperty()
    newpassword:string

    @ApiProperty()
    name: string
} 

export class authUserDto {
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
}

export class AuthUserDtoDto {
    userOrEmail: string;
    password: string;

}

export class TokenDto {
    @ApiProperty()
    token: string;
}