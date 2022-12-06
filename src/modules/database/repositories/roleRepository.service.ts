import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Role } from '../../../models/role.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class RoleRepository {
    constructor(
        @Inject('ROLE_REPOSITORY')
        private rolesRepository: Repository<Role>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save role
        const role = await this.rolesRepository.create(request)
        await this.rolesRepository.save(role)

        //return
        return role
    }

    async getAll(): Promise<Role[] | string> {
        return await this.rolesRepository.createQueryBuilder('r')
            .orderBy('r.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Role | string> {
        const role = await this.rolesRepository.findOne(id)
        if (!role) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return role;
    }


    async update(id: number, request): Promise<any> {
        let role = await this.rolesRepository.findOne(id);
        if (!role)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        role = await this.sharedService.updateObject(role, request)

        await this.rolesRepository.save(role);

        return role;
    }

    async delete(id): Promise<any> {
        const role = await this.rolesRepository.findOne(id);
        if (!role)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.rolesRepository.delete(role.id);

        return role;

    }

}