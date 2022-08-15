import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import {WinstonLogger} from "@payk/nestjs-winston";
import { UserRepository } from 'src/modules/database/repositories/userRepository.service';
import * as bcrytp from 'bcrypt'
import { IRegisterBody, IUpdateBody } from './interfaces/auth.interfaces';
import { UserRoleRepository } from 'src/modules/database/repositories/userRoleRepository.service';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class AuthService {
   private readonly logger = new WinstonLogger(AuthService.name);

   constructor(
      private readonly userRepository: UserRepository,
      private readonly userRoleRepository: UserRoleRepository,
      private readonly imageRepository: ImageRepository,
      private firestorageService: FirestorageService
   ) {}

   async login(userOrEmail: string, password: string){
      const user = await this.userRepository.findUsername(userOrEmail)
      if(!!user){
         const validatePass = await bcrytp.compare(password, user.password)
         if(validatePass){
            return user;
         }
      }
      return false;
   }
   async loginUsername(userOrEmail: string){
      const user = await this.userRepository.findUsername(userOrEmail)
      if(!!user){
         
               return user;
      }
      return false;
   }

   async register(request: IRegisterBody | any, image){
      const username = await this.userRepository.findUsername(request.email)
      if (!!username) throw new BadRequestException(['email is already in use'])

      request.image_id = image? (await this.imageRepository.create(image)).id: 1

      const user = await this.userRepository.register(request)
      await this.userRoleRepository.saveUserRole(user.id, request.role_id)

      return await this.userRepository.findById(user.id);
   }

   async update(id:number | string, request: IUpdateBody, file){

      let user = await this.userRepository.update(id, request)

      if(file){
         user.image_id != 1 ?await this.deleteFirebase(user.image_id) : null

         if(user.image_id && user.image_id != 1){
            await this.imageRepository.update(user.image_id, file)
         }else{
            let img = await this.imageRepository.create(file)
            user = await this.userRepository.update(id, {image_id: img.id})
         }
         
      }

      return await this.userRepository.findById(id);
   }

   async delete(id: number | string){
      const user = await this.userRepository.delete(id)
      user.image_id != 1 ?await this.deleteFirebase(user.image_id) : null

      return {statusCode: 200, message: 'removed'}
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image? await this.firestorageService.remove(image.name): null
      return true
   }
}