import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { OpinionTagRepository } from 'src/modules/database/repositories/opinionTagRepository.service';
import { TagRepository } from 'src/modules/database/repositories/tagRepository.service';
import { OpinionRepository } from '../../modules/database/repositories/opinionRepository.service';
@Injectable()
export class OpinionService {

   constructor(
      private readonly opinionRepository: OpinionRepository,
      private readonly tagRepository: TagRepository,
      private readonly opinionTagRepository: OpinionTagRepository,

   ) { }

   async create(request: any) {
      const tags = request.tags
      delete request.tags

      const opinion = await this.opinionRepository.create(request)
      if (!opinion) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)

      for (let index = 0; index < tags.length; index++) {
         const tag = tags[index];
         this.addTags(tag, opinion.id)         
      }

      return opinion;
   }

   async addTags(tag, opinion_id) {
      //Si viene con id, existe. Si no, es nuevo.

      if (!tag.id) {
         const newTag = await this.tagRepository.create(tag)
         if (!newTag) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)
         else this.opinionTagRepository.saveOpinionTag(opinion_id, newTag.id)
      } 

      else this.opinionTagRepository.saveOpinionTag(opinion_id, tag.id)
   }

   async getAll() {
      const opinions = await this.opinionRepository.getAll()
      return opinions;
   }

   async getById(id: number) {
      const opinion = await this.opinionRepository.getById(id)
      return opinion;
   }

   async update(id: number, request: any) {
      let tags = request.tag
      delete request.tag

      const opinion = await this.opinionRepository.update(id, request)
      if (!opinion) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)

      tags.forEach(tag => { this.addTags(tag, opinion.id) })

      return opinion;
   }

   async delete(id: number) {
      const opinion = await this.opinionRepository.delete(id)

      return { statusCode: 200, message: 'removed' }
   }

}