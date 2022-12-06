import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { LostObjectRepository } from '../../modules/database/repositories/lostObjectRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class LostObjectService {

   constructor(
      private readonly lostObjectRepository: LostObjectRepository,
      private imageRepository: ImageRepository,
      private firestorageService:FirestorageService
   ) { }

   async create(request: any, file) {
      request.image_id = (await this.imageRepository.create(file)).id

      const lostObject = await this.lostObjectRepository.create(request)
      if (!lostObject) throw new BadRequestException(['incorrect data']) 
      return await this.getById(lostObject.id);
   }

   async getAll(search) {
      const lostObjects = await this.lostObjectRepository.getAll(search)
      return lostObjects;
   }

   async getById(id: number) {
      const lostObject = await this.lostObjectRepository.getById(id)
      return lostObject;
   }

   async update(id: number, request: any, image) {

      const lostObject = await this.lostObjectRepository.update(id, request)

      if (image) {
         await this.deleteFirebase(lostObject.image_id)
         await this.imageRepository.update(lostObject.image_id, image)
      }

      return await this.getById(lostObject.id);
   }

   async delete(id: number) {
      const lostObject = await this.lostObjectRepository.delete(id)
      await this.deleteFirebase(lostObject.image_id)
      await this.imageRepository.delete(lostObject.image_id)

      return {statusCode: 200, message: 'removed'}
   }


   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image? await this.firestorageService.remove(image.name): null
      return true
   }     
}