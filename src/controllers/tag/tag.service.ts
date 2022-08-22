import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { TagRepository } from '../../modules/database/repositories/tagRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class TagService {

    constructor(
        private readonly tagRepository: TagRepository,
        private readonly imageRepository: ImageRepository,
        private firestorageService: FirestorageService
    ) {}

    async create(request: any, file){
      request.image_id = (await this.imageRepository.create(file)).id

      const tag = await this.tagRepository.create(request)
      if (!tag) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

      return tag;
   }

   async getAll(){
      const tags = await this.tagRepository.getAll()
      return tags;
   }

   async getById(id:number){
      const tag = await this.tagRepository.getById(id)
      return tag;
   }

   async update(id:number, request: any, file){

      const tag = await this.tagRepository.update(id, request)

      if (file) {
         await this.deleteFirebase(tag.image_id)
         await this.imageRepository.update(tag.image_id, file)
      }

      return tag;
   }

   async delete(id: number){
      const tag = await this.tagRepository.delete(id)
      await this.deleteFirebase(tag.image_id)
      await this.imageRepository.delete(tag.image_id)

      return {statusCode: 200, message: 'removed'}
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image? await this.firestorageService.remove(image.name): null
      return true
   }     

}