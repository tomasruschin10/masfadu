import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { AdvertisementRepository } from '../../modules/database/repositories/advertisementRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class AdvertisementService {

    constructor(
        private readonly advertisementRepository: AdvertisementRepository,
        private readonly imageRepository: ImageRepository,
        private firestorageService: FirestorageService
    ) {}

    async create(request: any, file){
      request.image_id = (await this.imageRepository.create(file)).id

      const advertisement = await this.advertisementRepository.create(request)
      if (!advertisement) throw new BadRequestException(['incorrect data'])     

      return await this.advertisementRepository.getById(advertisement.id);
   }

   async getAll(active){
      const advertisements = await this.advertisementRepository.getAll(active)
      return advertisements;
   }

   async getByKey(key){
      const advertisements = await this.advertisementRepository.getByKey(key)
      return advertisements;
   }

   async getById(id:number){
      const advertisement = await this.advertisementRepository.getById(id)
      return advertisement;
   }

   async update(id:number, request: any, file){

      const advertisement = await this.advertisementRepository.update(id, request)

      if (file) {
         await this.deleteFirebase(advertisement.image_id)
         await this.imageRepository.update(advertisement.image_id, file)
      }

      return await this.advertisementRepository.getById(advertisement.id);
   }

   async delete(id: number){
      const advertisement = await this.advertisementRepository.delete(id)
      await this.deleteFirebase(advertisement.image_id)
      await this.imageRepository.delete(advertisement.image_id)

      return {statusCode: 200, message: 'removed'}
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image? await this.firestorageService.remove(image.name): null
      return true
   }     

}