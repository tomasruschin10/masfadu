import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { NoticeRepository } from '../../modules/database/repositories/noticeRepository.service';
@Injectable()
export class NoticeService {

   constructor(
      private readonly noticeRepository: NoticeRepository,
      private readonly imageRepository: ImageRepository
   ) { }

   async create(request: any, image) {
      request.image_id = image ? (await this.imageRepository.create(image)).id : 1
      const notice = await this.noticeRepository.create(request)
      if (!notice) throw new BadRequestException(['incorrect data'])

      return notice;
   }

   async getAll(active) {
      const notices = await this.noticeRepository.getAll(active)
      return notices;
   }

   async getById(id: number) {
      const notice = await this.noticeRepository.getById(id)
      return notice;
   }

   async update(id: number, request: any) {

      const notice = await this.noticeRepository.update(id, request)

      return notice;
   }

   async delete(id: number) {
      const notice = await this.noticeRepository.delete(id)


      return { statusCode: 200, message: 'removed' }
   }



}