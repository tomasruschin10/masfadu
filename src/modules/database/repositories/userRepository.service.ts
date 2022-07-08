import { Injectable, Inject, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, UpdateResult, Repository, Connection, createQueryBuilder} from "typeorm";
import * as moment from "moment";
import { User } from '../../../models/user.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserRepository {
    constructor(
        @Inject('USER_REPOSITORY')
        private usersRepository: Repository<User>
    ) {}

    async findUsername(uoe:string): Promise<User>{
        return this.usersRepository.createQueryBuilder('u')
            .leftJoinAndSelect('u.userRole', 'ur')
            .innerJoinAndSelect('ur.role', 'r')
            .where('u.username = :uoe OR u.email = :uoe',{ uoe})
            .getOne();
    }

    async register(request){
        //save user
        const hash = await bcrypt.hash(request.password, 12);
        const user = this.usersRepository.create({
            username: request.username, 
            email: request.email, 
            password: hash,
            name: request.name
        })
        await this.usersRepository.save(user)
        //return
        return user
    }

    async getAll(id): Promise<User[]> {
        let users = null
        if(id){
            users = await this.usersRepository.createQueryBuilder('u')
                .leftJoinAndSelect('u.userRole', 'ur')
                .innerJoinAndSelect('ur.role', 'r')
                .where('ur.role_id = :id', {id})
                .getMany()
        }else{
            users = await this.usersRepository.createQueryBuilder('u')
                .leftJoinAndSelect('u.userRole', 'ur')
                .innerJoinAndSelect('ur.role', 'r')
                .getMany()
        }
        
        return users
    }


    async findById(id): Promise<User | string | any> {
        const user = await this.usersRepository.createQueryBuilder('u')
            .leftJoinAndSelect('u.userRole', 'ur')
            .innerJoinAndSelect('ur.role', 'r')
            .where('u.id = :id', {id})
            .getOne()

        if (!user) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return user;
    }


    async update(id: number, request): Promise<any> {
        const user = await this.usersRepository.findOne(id);
        if (!user)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 


        if(request.password){
            const validatePass = await bcrypt.compare(request.password, user.password)
            if(!validatePass){
                throw new HttpException('error! incorrect current password',HttpStatus.BAD_REQUEST);
            }

            const hash = await bcrypt.hash(request.newpassword, 12);
            request.newpassword ? user.password = hash : user.password = user.password;
        }        
            
        
        
        request.username ? user.username = request.username : user.username = user.username;
        request.email ? user.email = request.email : user.email = user.email;
        request.name ? user.name = request.name : user.name = user.name;

        await this.usersRepository.save(user);

        return user;
    } 

    async delete(id): Promise<any> {
        const user = await this.usersRepository.findOne(id);
        if (!user)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.usersRepository.delete(user.id);

        return user;

    }

}