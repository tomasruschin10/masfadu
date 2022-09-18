import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ResourceCategoryRepository } from '../../modules/database/repositories/resourceCategoryRepository.service';
@Injectable()
export class ResourceCategoryService {

    constructor(
        private readonly resourceCategoryRepository: ResourceCategoryRepository
    ) {}

    async create(request: any){

      const resourceCategory = await this.resourceCategoryRepository.create(request)
      if (!resourceCategory) throw new BadRequestException(['incorrect data'])     

      return resourceCategory;
   }

   async getAll(data){
      const resourceCategorys = await this.resourceCategoryRepository.getAll(data)
      return resourceCategorys;
   }

   async getById(id:number){
      const resourceCategory = await this.resourceCategoryRepository.getById(id)
      return resourceCategory;
   }

   async update(id:number, request: any){

      const resourceCategory = await this.resourceCategoryRepository.update(id, request)

      return resourceCategory;
   }

   async delete(id: number){
      const resourceCategory = await this.resourceCategoryRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}