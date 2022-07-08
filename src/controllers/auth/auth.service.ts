import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import * as Soap from "soap";
import * as validate from 'uuid-validate';
import {WinstonLogger} from "@payk/nestjs-winston";
import validator from "validator";
import * as config from "config";
import { UserRepository } from 'src/modules/database/repositories/userRepository.service';
import * as bcrytp from 'bcrypt'
import { IRegisterBody, IUpdateBody } from './interfaces/auth.interfaces';
import { UserRoleRepository } from 'src/modules/database/repositories/userRoleRepository.service';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
@Injectable()
export class AuthService {
    private readonly logger = new WinstonLogger(AuthService.name);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userRoleRepository: UserRoleRepository,
        private readonly imageRepository: ImageRepository
    ) {}

     async login(userOrEmail: string, password: string){
        const user = await this.userRepository.findUsername(userOrEmail)
        if(!!user){
            const validatePass = await bcrytp.compare(password, user.password)
            if(validatePass){
                return user;
            }
        }
        return false;
     }
     async loginUsername(userOrEmail: string){
        const user = await this.userRepository.findUsername(userOrEmail)
        if(!!user){
            
                return user;
        }
        return false;
     }


     async register(request: IRegisterBody){

        const username = await this.userRepository.findUsername(request.username)
        if (!!username) throw new HttpException('username is already in use',HttpStatus.BAD_REQUEST)


        const user = await this.userRepository.register(request)
        if (!user) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)

        const userRole = await this.userRoleRepository.saveUserRole(user.id, request.role_id)
        if (!userRole) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

        return user;
     }

     async update(id:number, request: IUpdateBody){

        const user = await this.userRepository.update(id, request)


        return user;
     }

     async delete(id: number){
        const user = await this.userRepository.delete(id)


        return {statusCode: 200, message: 'removed'}
     }

}