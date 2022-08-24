import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
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
      var opinion = await this.opinionRepository.create(request)
      if (!opinion) {
         throw new BadRequestException(['incorrect data'])
      } else {
         for (let tag of tags) {
            await this.addTags(tag, opinion.id)
         }
         opinion = await this.opinionRepository.getById(opinion.id)
      }
      return opinion;
   }

   async addTags(tag: any, opinion_id: any) {
      if (!tag.id) {
         let newTag = await this.tagRepository.create({ name: tag.name })
         tag.id = newTag.id
      }
      tag = await this.opinionTagRepository.create(opinion_id, tag.id)
      return tag;
   }

   async getAll(id) {
      const opinions = await this.opinionRepository.getAll(id)
      return opinions;
   }

   async getById(id: number) {
      const opinion = await this.opinionRepository.getById(id)
      return opinion;
   }

   async update(id: number, request: any) {
      let tags = request.tags
      delete request.tags
      await this.deleteTags(await this.getById(id))
      for (let tag of tags) {
         await this.addTags(tag, id)
      }
      const opinion = await this.opinionRepository.update(id, request)
      if (!opinion) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)
      return opinion;
   }

   async deleteTags(opinion: any) {
      for (let opinionTag of opinion.opinionTags) {
         await this.opinionTagRepository.delete(opinionTag.id)
      }
   }



   async delete(id: number) {
      const opinion = await this.opinionRepository.delete(id)

      return { statusCode: 200, message: 'removed' }
   }

}