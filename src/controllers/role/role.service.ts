import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { RoleRepository } from '../../modules/database/repositories/roleRepository.service';
@Injectable()
export class RoleService {

    constructor(
        private readonly roleRepository: RoleRepository
    ) {}

    async create(request: any){

      const role = await this.roleRepository.create(request)
      if (!role) throw new BadRequestException(['incorrect data'])     

      return role;
   }

   async getAll(){
      const roles = await this.roleRepository.getAll()
      return roles;
   }

   async getById(id:number){
      const role = await this.roleRepository.getById(id)
      return role;
   }

   async update(id:number, request: any){

      const role = await this.roleRepository.update(id, request)

      return role;
   }

   async delete(id: number){
      const role = await this.roleRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}