import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, UpdateResult, Repository, Connection} from "typeorm";
import * as moment from "moment";
import { Role } from '../../../models/role.entity';
@Injectable()
export class RoleRepository {
    constructor(
        @Inject('ROLE_REPOSITORY')
        private rolesRepository: Repository<Role>
    ) {}


    async create(request): Promise<any>{
        //save role
        const role = await this.rolesRepository.create(request)
        await this.rolesRepository.save(role)
        
        //return
        return role
    }

    async getAll(): Promise<Role[] | string> {
        const roles = await this.rolesRepository.find()
        
        return roles
    }


    async getById(id): Promise<Role | string> {
        const role = await this.rolesRepository.findOne(id)
        if (!role) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return role;
    }


    async update(id: number, request): Promise<any> {
        const role = await this.rolesRepository.findOne(id);
        if (!role)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        request.name ? role.name = request.name : role.name = role.name;

        await this.rolesRepository.save(role);

        return role;
    }

    async delete(id): Promise<any> {
        const role = await this.rolesRepository.findOne(id);
        if (!role)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.rolesRepository.delete(role.id);

        return role;

    }

}