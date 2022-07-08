import {Injectable, Inject} from '@nestjs/common';
import {Repository} from "typeorm";
import { UserRole } from '../../../models/userRole.entity';
@Injectable()
export class UserRoleRepository {
    constructor(
        @Inject('USER_ROLE_REPOSITORY')
        private userRolesRepository: Repository<UserRole>
    ) {}


    async saveUserRole(user_id: number, role_id: number): Promise<any>{
        //save user role
        const user_role = await this.userRolesRepository.create({user_id: user_id, role_id: role_id})
        await this.userRolesRepository.save(user_role)
        
        //return
        return user_role
    }
}