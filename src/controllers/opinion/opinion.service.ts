import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ActivityRepository } from 'src/modules/database/repositories/activityRepository.service';
import { OpinionTagRepository } from 'src/modules/database/repositories/opinionTagRepository.service';
import { SubjectRepository } from 'src/modules/database/repositories/subjectRepository.service';
import { TagRepository } from 'src/modules/database/repositories/tagRepository.service';
import { OpinionRepository } from '../../modules/database/repositories/opinionRepository.service';
@Injectable()
export class OpinionService {

   constructor(
      private readonly opinionRepository: OpinionRepository,
      private readonly opinionTagRepository: OpinionTagRepository,
      private readonly tagRepository: TagRepository,
      private readonly activityRepository: ActivityRepository,
      private readonly subjectRepository: SubjectRepository,

   ) { }

   async create(request: any, user_id: any) {
      const tags = request.tags
      delete request.tags
      request.student_id = user_id
      var opinion = await this.opinionRepository.create(request)
      if (!opinion) throw new BadRequestException(['incorrect data'])
      let oldTag = [0]
      for (let tag of tags) {
         if (!oldTag.some(a => a == tag.id))
            oldTag.push((await this.addTags(tag, opinion.id)).tag_id)
      }

      opinion = await this.opinionRepository.getById(opinion.id)

      await this.createActivity(opinion, user_id)

      return opinion;
   }

   async createActivity(opinion: any, user_id: any) {


      let subject = await this.subjectRepository.getById(opinion.subject_id)
      let activity = {
         user_id: user_id,
         action: 'Comentaste',
         description: `en la materia ${subject.name}`,
         type: 'Comentario'
      }

      await this.activityRepository.create(activity)

   }

   async addTags(tag: any, opinion_id: any) {
      if (tag.id && !await this.tagRepository.findTag(tag.id)) return "not existent id"
      let tagByName = await this.tagRepository.findTag(tag.name.toUpperCase())
      if (tag.name && tagByName) tag.id = (await this.tagRepository.findTag(tag.name.toUpperCase())).id
      if (!tag.id) {
         let newTag = await this.tagRepository.create({ name: tag.name.toUpperCase() })
         tag.id = newTag.id
      }
      tag = await this.opinionTagRepository.create(opinion_id, tag.id)
      return tag;
   }

   async getAll(data) {
      let opinions = await this.opinionRepository.getAll(data)
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