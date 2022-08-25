import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { ResourceCategoryRepository } from 'src/modules/database/repositories/resourceCategoryRepository.service';
import { ResourceRepository } from '../../modules/database/repositories/resourceRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class ResourceService {

   constructor(
      private readonly resourceRepository: ResourceRepository,
      private readonly imageRepository: ImageRepository,
      private firestorageService: FirestorageService
   ) { }

   async create(request: any, file) {
      request.image_id = (await this.imageRepository.create(file)).id

      let resource = await this.resourceRepository.create(request)
      if (!resource) throw new BadRequestException(['incorrect data'])

      resource = await this.resourceRepository.getById(resource.id)

      return resource;
   }

   async getAll() {
      const resources = await this.resourceRepository.getAll()
      return resources;
   }

   async getById(id: number) {
      const resource = await this.resourceRepository.getById(id)
      return resource;
   }

   async update(id: number, request: any, file) {

      let resource = await this.resourceRepository.update(id, request)

      if (file) {
         await this.deleteFirebase(resource.image_id)
         await this.imageRepository.update(resource.image_id, file)
      }

      resource = await this.resourceRepository.getById(resource.id)
      
      return resource;
   }

   async delete(id: number) {
      const resource = await this.resourceRepository.delete(id)
      await this.deleteFirebase(resource.image_id)
      await this.imageRepository.delete(resource.image_id)

      return { statusCode: 200, message: 'removed' }
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image ? await this.firestorageService.remove(image.name) : null
      return true
   }

}