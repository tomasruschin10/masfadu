import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { OpinionRepository } from '../../modules/database/repositories/opinionRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class OpinionService {

    constructor(
        private readonly opinionRepository: OpinionRepository,
        private readonly imageRepository: ImageRepository,
        private firestorageService: FirestorageService
    ) {}

    async create(request: any, file){
      request.image_id = (await this.imageRepository.create(file)).id

      const opinion = await this.opinionRepository.create(request)
      if (!opinion) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

      return opinion;
   }

   async getAll(){
      const opinions = await this.opinionRepository.getAll()
      return opinions;
   }

   async getById(id:number){
      const opinion = await this.opinionRepository.getById(id)
      return opinion;
   }

   async update(id:number, request: any, file){

      const opinion = await this.opinionRepository.update(id, request)

      if (file) {
         await this.deleteFirebase(opinion.image_id)
         await this.imageRepository.update(opinion.image_id, file)
      }

      return opinion;
   }

   async delete(id: number){
      const opinion = await this.opinionRepository.delete(id)
      await this.deleteFirebase(opinion.image_id)
      await this.imageRepository.delete(opinion.image_id)

      return {statusCode: 200, message: 'removed'}
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image? await this.firestorageService.remove(image.name): null
      return true
   }     

}