import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class authRegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    lastname: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    instagram: string;

    @ApiProperty()
    web: string;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    career_id: number;

    @ApiProperty()
    image: Express.Multer.File;

    @ApiProperty()
    device_token: string;

    @ApiProperty()
    @IsNotEmpty()
    role_id: number
} 
export class authUpdateDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
    
    @ApiProperty()
    newpassword: string;
    
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    lastname: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    instagram: string;

    @ApiProperty()
    web: string;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    career_id: number;

    @ApiProperty()
    image: Express.Multer.File;

    @ApiProperty()
    device_token: string;
} 

export class authUserDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
    
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    lastname: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    instagram: string;

    @ApiProperty()
    web: string;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    active: number;

    @ApiProperty()
    career_id: number;

    @ApiProperty()
    image_id: number;

    @ApiProperty()
    remember_token: string;

    @ApiProperty()
    device_token: string;  
  
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