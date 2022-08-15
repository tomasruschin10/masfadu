import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { NoticeRepository } from '../../modules/database/repositories/noticeRepository.service';
@Injectable()
export class NoticeService {

    constructor(
        private readonly noticeRepository: NoticeRepository
    ) {}

    async create(request: any){

      const notice = await this.noticeRepository.create(request)
      if (!notice) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

      return notice;
   }

   async getAll(active){
      const notices = await this.noticeRepository.getAll(active)
      return notices;
   }

   async getById(id:number){
      const notice = await this.noticeRepository.getById(id)
      return notice;
   }

   async update(id:number, request: any){

      const notice = await this.noticeRepository.update(id, request)

      return notice;
   }

   async delete(id: number){
      const notice = await this.noticeRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}