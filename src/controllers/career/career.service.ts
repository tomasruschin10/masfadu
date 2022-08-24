import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { CareerRepository } from '../../modules/database/repositories/careerRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class CareerService {

    constructor(
        private readonly careerRepository: CareerRepository,
        private readonly imageRepository: ImageRepository,
        private firestorageService: FirestorageService
    ) {}

    async create(request: any, file){
      let image =(await this.imageRepository.create(file))
      request.image_id = image.id

      const career = await this.careerRepository.create(request)
      if (!career) throw new BadRequestException(['incorrect data'])
      career.image_url=image.url

      return career;
   }

   async getAll(){
      const careers = await this.careerRepository.getAll()
      return careers;
   }

   async getById(id:number){
      const career = await this.careerRepository.getById(id)
      return career;
   }

   async update(id:number, request: any, file){

      const career = await this.careerRepository.update(id, request)

      
      if (file) {
         await this.deleteFirebase(career.image_id)
         await this.imageRepository.update(career.image_id, file)
      }
      career.image_url=(await this.imageRepository.getById(career.image_id)).url

      return career;
   }

   async delete(id: number){
      const career = await this.careerRepository.delete(id)
      await this.deleteFirebase(career.image_id)
      await this.imageRepository.delete(career.image_id)

      return {statusCode: 200, message: 'removed'}
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image? await this.firestorageService.remove(image.name): null
      return true
   }     

}