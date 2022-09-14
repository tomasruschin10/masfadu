import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { TagRepository } from '../../modules/database/repositories/tagRepository.service';
@Injectable()
export class TagService {

   constructor(
      private readonly tagRepository: TagRepository,
   ) { }

   async create(request: any) {
      request.name = request.name.toUpperCase()
      let tagByName = await this.tagRepository.findTag(request.name)
      if (tagByName) throw new HttpException('Tag already exists', HttpStatus.BAD_REQUEST)

      let tag = await this.tagRepository.create(request)
      if (!tag) throw new HttpException('Incorrect data', HttpStatus.BAD_REQUEST)
      return tag;
   }

   async getAll() {
      const tags = await this.tagRepository.getAll()
      return tags;
   }

   async getById(id: number) {
      const tag = await this.tagRepository.getById(id)
      return tag;
   }

   async update(id: number, request: any) {
      request.name = request.name.toUpperCase()
      let tagByName = await this.tagRepository.findTag(request.name)
      if (tagByName) throw new HttpException('Tag already exists', HttpStatus.BAD_REQUEST)

      const tag = await this.tagRepository.update(id, request)

      return tag;
   }

   async delete(id: number) {
      const tag = await this.tagRepository.delete(id)
      return { statusCode: 200, message: 'removed' }
   }

}