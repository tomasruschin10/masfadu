import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { TagRepository } from '../../modules/database/repositories/tagRepository.service';
@Injectable()
export class TagService {

    constructor(
        private readonly tagRepository: TagRepository,
    ) {}

    async create(request: any){

      const tag = await this.tagRepository.create(request)
      if (!tag) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

      return tag;
   }

   async getAll(){
      const tags = await this.tagRepository.getAll()
      return tags;
   }

   async getById(id:number){
      const tag = await this.tagRepository.getById(id)
      return tag;
   }

   async update(id:number, request: any){

      const tag = await this.tagRepository.update(id, request)

      return tag;
   }

   async delete(id: number){
      const tag = await this.tagRepository.delete(id)
      return {statusCode: 200, message: 'removed'}
   }   

}