import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { SubjectCategoryRepository } from '../../modules/database/repositories/subjectCategoryRepository.service';
@Injectable()
export class SubjectCategoryService {

    constructor(
        private readonly subjectCategoryRepository: SubjectCategoryRepository
    ) {}

    async create(request: any){

      const subjectCategory = await this.subjectCategoryRepository.create(request)
      if (!subjectCategory) throw new BadRequestException(['incorrect data'])     

      return subjectCategory;
   }

   async getAll(){
      const subjectCategorys = await this.subjectCategoryRepository.getAll()
      return subjectCategorys;
   }

   async getById(id:number){
      const subjectCategory = await this.subjectCategoryRepository.getById(id)
      return subjectCategory;
   }

   async update(id:number, request: any){

      const subjectCategory = await this.subjectCategoryRepository.update(id, request)

      return subjectCategory;
   }

   async delete(id: number){
      const subjectCategory = await this.subjectCategoryRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}