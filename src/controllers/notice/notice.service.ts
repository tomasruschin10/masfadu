import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { NoticeRepository } from '../../modules/database/repositories/noticeRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class NoticeService {

   constructor(
      private readonly noticeRepository: NoticeRepository,
      private readonly imageRepository: ImageRepository,
      private readonly firestorageService: FirestorageService,
   ) { }

   async create(request: any, image) {
      request.image_id = (await this.imageRepository.create(image)).id
      const notice = await this.noticeRepository.create(request)
      if (!notice) throw new BadRequestException(['incorrect data'])

      return await this.noticeRepository.getById(notice.id);
   }

   async getAll(active) {
      const notices = await this.noticeRepository.getAll(active)
      return notices;
   }

   async getById(id: number) {
      const notice = await this.noticeRepository.getById(id)
      return notice;
   }

   async update(id: number, request: any, file) {
      let notice = await this.noticeRepository.update(id, request)
      if (file) {
         await this.deleteFirebase(notice.image_id)
         await this.imageRepository.update(notice.image_id, file)
      }


      return await this.noticeRepository.getById(notice.id);
   }

   async delete(id: number) {
      const notice = await this.noticeRepository.delete(id)
      await this.deleteFirebase(notice.image_id)


      return { statusCode: 200, message: 'removed' }
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image ? await this.firestorageService.remove(image.name) : null
      return true
   }



}