import { Injectable, Inject, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { Repository } from "typeorm";
import { User } from '../../../models/user.entity';
import * as bcrypt from 'bcrypt'
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class UserRepository {
    constructor(
        @Inject('USER_REPOSITORY')
        private usersRepository: Repository<User>,
        private sharedService: SharedService
    ) {}

    async findUsername(uoe:string): Promise<User>{
        return this.usersRepository.createQueryBuilder('u')
            .leftJoinAndSelect('u.userRole', 'ur')
            .innerJoinAndSelect('ur.role', 'r')
            .leftJoinAndSelect('u.career', 'uc')
            .leftJoinAndSelect('u.image', 'ui')
            // .where('u.email = :uoe',{ uoe})
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
            name: request.name ? request.name : null,
            lastname: request.lastname ? request.lastname : null,
            phone: request.phone ? request.phone : null,
            instagram: request.instagram ? request.instagram : null,
            web: request.web ? request.web : null,
            active: request.active,
            uid: request.uid ? request.uid : null,
            career_id: request.career_id ? request.career_id : null,
            image_id: request.image_id,
            device_token: request.device_token ? request.device_token : null
        })
        await this.usersRepository.save(user)
        //return
        return user
    }

    async getAll(id): Promise<User[]> {
        return await this.usersRepository.createQueryBuilder('u')
            .leftJoinAndSelect('u.userRole', 'ur')
            .innerJoinAndSelect('ur.role', 'r')
            .leftJoinAndSelect('u.career', 'uc')
            .leftJoinAndSelect('u.image', 'ui')
            .where(id ? `ur.role_id = ${id}`:'')
            .getMany()
    }


    async findById(id): Promise<User | string | any> {
        const user = await this.usersRepository.createQueryBuilder('u')
            .leftJoinAndSelect('u.userRole', 'ur')
            .innerJoinAndSelect('ur.role', 'r')
            .leftJoinAndSelect('u.career', 'uc')
            .leftJoinAndSelect('u.image', 'ui')
            .where(isNaN(id)? `u.uid = '${id}' `:` u.id = ${id}`)
            .getOne()

        if (!user) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return user;
    }


    async update(id, request): Promise<any> {
        let user = await this.usersRepository.createQueryBuilder('u').where(isNaN(id)? `u.uid = '${id}' `:` u.id = ${id}`).getOne();
        if (!user)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 

        if (request.email) {
            let userEmail = await this.findUsername(request.email);
            if (userEmail && userEmail.id != id)
                throw new BadRequestException(['email is already in use'])
        }

        if(request.password){
            const validatePass = await bcrypt.compare(request.password, user.password)
            if(!validatePass){
                throw new BadRequestException(['incorrect current password']);
            }

            const hash = await bcrypt.hash(request.newpassword, 12);
            request.newpassword ? user.password = hash : user.password = user.password;
            delete request.password
        }        
            
        user = await this.sharedService.updateObject(user, request)

        await this.usersRepository.save(user);

        return user;
    } 

    async delete(id): Promise<any> {
        const user = await this.usersRepository.createQueryBuilder('u').where(isNaN(id)? `u.uid = '${id}' `:` u.id = ${id}`).getOne();
        if (!user)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.usersRepository.delete(user.id);

        return user;

    }

    async deleteToken(token){
        let user = await this.usersRepository.createQueryBuilder('u')
        .where('u.remember_token = :token',{token})
        .getOne();

        if(!user) throw new HttpException('error! wrong token or expired',HttpStatus.NOT_FOUND);

        user.remember_token = null
        await this.usersRepository.save(user);

        return user
    }

    async updatePassToken(id, password) : Promise<User | any>{

        let user = await this.usersRepository.createQueryBuilder('u')
            .where('u.id = :id',{id})
            .getOne();

        if(!user) throw new HttpException('error! record not found',HttpStatus.NOT_FOUND);
        
        let hash = await bcrypt.hash(password, 12);
        user.password = hash
        await this.usersRepository.save(user);
        return 'success'
    }

}