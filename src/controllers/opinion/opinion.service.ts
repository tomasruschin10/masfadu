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

   async create(request: any, user_id: any) {
      const tags = request.tags
      delete request.tags

      request.student_id = user_id

      const opinion = await this.opinionRepository.create(request)
      if (!opinion) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)

      for (let i = 0; i < tags.length; i++) {
         const tag = tags[i];
         await this.addTags(tag, opinion.id)
      }

      return opinion;
   }

   async addTags(tag: any, opinion_id: any) {
      try {
         await this.tagRepository.getById(tag.id)
         await this.opinionTagRepository.saveOpinionTag(opinion_id, tag.id)

      } catch (error) {
         const newTag = await this.tagRepository.create(tag)
         if (!newTag) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)
         else await this.opinionTagRepository.saveOpinionTag(opinion_id, newTag.id)
      }

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