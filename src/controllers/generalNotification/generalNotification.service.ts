import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/modules/database/repositories/userRepository.service';
import { SharedService } from 'src/modules/shared/shared.service';
import { GeneralNotificationRepository } from '../../modules/database/repositories/generalNotificationRepository.service';
@Injectable()
export class GeneralNotificationService {

    constructor(
        private readonly generalNotificationRepository: GeneralNotificationRepository,
        private readonly userRepository: UserRepository,
        private readonly sharedService: SharedService
    ) {}

    async create(request: any){

      const generalNotification = await this.generalNotificationRepository.create(request)
      if (!generalNotification) throw new BadRequestException(['incorrect data'])     

      let users = await this.userRepository.getUsersTokens();
      let notification = {
         title: generalNotification.title,
         message: generalNotification.description,
         user_to: null
      }
      for (let user of users) {
         await this.sharedService.sendNotification(notification, user)
      }

      return generalNotification;
   }

   async getAll(){
      const generalNotifications = await this.generalNotificationRepository.getAll()
      return generalNotifications;
   }

   // async getById(id:number){
   //    const generalNotification = await this.generalNotificationRepository.getById(id)
   //    return generalNotification;
   // }

   // async update(id:number, request: any){

   //    const generalNotification = await this.generalNotificationRepository.update(id, request)

   //    return generalNotification;
   // }

   async delete(id: number){
      const generalNotification = await this.generalNotificationRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}