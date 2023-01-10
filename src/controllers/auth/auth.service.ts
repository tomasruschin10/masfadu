import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import {WinstonLogger} from "@payk/nestjs-winston";
import { UserRepository } from 'src/modules/database/repositories/userRepository.service';
import * as bcrytp from 'bcrypt'
import * as config from "config";
import { IRegisterBody, IUpdateBody } from './interfaces/auth.interfaces';
import { UserRoleRepository } from 'src/modules/database/repositories/userRoleRepository.service';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
import { MailerService } from '@nestjs-modules/mailer';
import { MailPasswordHtml } from 'src/utils/html/mail_password';
import { MailPasswordCodeHtml } from 'src/utils/html/mail_password_code';
@Injectable()
export class AuthService {
   private readonly logger = new WinstonLogger(AuthService.name);

   constructor(
      private readonly userRepository: UserRepository,
      private readonly userRoleRepository: UserRoleRepository,
      private readonly imageRepository: ImageRepository,
      private mailerService : MailerService,
      private mailPasswordHtml: MailPasswordHtml,
      private mailPasswordCodeHtml: MailPasswordCodeHtml,
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

      if (!request.uid){
         await this.update(user.id, {uid: user.id}, null)
      }

      return await this.userRepository.findById(user.id);
   }

   async update(id:number | string, request: IUpdateBody | any, file){

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

   async updateDeviceToken(id: number, token) {
      await this.userRepository.update(id, {device_token: token})
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

   async rememberPass(email){
      let user = await this.userRepository.findUsername(email)
      if(!user) throw new HttpException('No existe usuario', HttpStatus.NOT_FOUND)
      let date = (new Date()).toLocaleString('es', {day: 'numeric', month: 'long', year: 'numeric'})

      let url = config.get("server.url-web")
      let html
      let token
      
      if(user.userRole[0].role_id == 2) {
         token = (Math.random() + 1).toString(36).substring(7).toUpperCase().substring(0,5);
         html = this.mailPasswordCodeHtml.html
      }else{
         token = await bcrytp.hash(`remember${email}${Date.now()}`, 12);
         html = this.mailPasswordHtml.html
      }

      html = html.replace(/{{name}}/gi, user.name)
      html = html.replace(/{{token}}/gi, token)
      html = html.replace(/{{date}}/gi, date)
      html = html.replace(/{{url}}/gi, url)


      await this.userRepository.update(user.id, {remember_token: token});
      await this.mailerService.sendMail({
         to:user.email,
         subject:'Olvidaste tu contraseña?',
         from:'Fadu',
         html: html
      })
      return token
   }

   async deleteToken(token){
      return await this.userRepository.deleteToken(token)
   }

   async updatePassToken(id, request){
      if(request.password != request.repeat_password) throw new BadRequestException(['Contraseñas no coinciden'])

      return await this.userRepository.updatePassToken(id, request.password)
      
   }
}