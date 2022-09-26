import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { OfferCategoryRepository } from '../../modules/database/repositories/offerCategoryRepository.service';
@Injectable()
export class OfferCategoryService {

    constructor(
        private readonly offerCategoryRepository: OfferCategoryRepository
    ) {}

    async create(request: any){

      const offerCategory = await this.offerCategoryRepository.create(request)
      if (!offerCategory) throw new BadRequestException(['incorrect data'])     

      return offerCategory;
   }

   async getAll(role_id, career_id, search){
      const offerCategorys = await this.offerCategoryRepository.getAll(role_id, career_id, search)
      return offerCategorys;
   }

   async getById(id:number){
      const offerCategory = await this.offerCategoryRepository.getById(id)
      return offerCategory;
   }

   async update(id:number, request: any){

      const offerCategory = await this.offerCategoryRepository.update(id, request)

      return offerCategory;
   }

   async delete(id: number){
      const offerCategory = await this.offerCategoryRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}