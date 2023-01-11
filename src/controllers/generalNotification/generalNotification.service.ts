import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ActivityRepository } from 'src/modules/database/repositories/activityRepository.service';
import { NotificationRepository } from 'src/modules/database/repositories/notificationRepository.service';
import { UserRepository } from 'src/modules/database/repositories/userRepository.service';
import { SharedService } from 'src/modules/shared/shared.service';
import { GeneralNotificationRepository } from '../../modules/database/repositories/generalNotificationRepository.service';
@Injectable()
export class GeneralNotificationService {

    constructor(
        private readonly generalNotificationRepository: GeneralNotificationRepository,
        private readonly notificationRepository: NotificationRepository,
        private readonly activityRepository: ActivityRepository,
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

   async getUserNotification(id:number){
      let generalNotifications = await this.generalNotificationRepository.getLimit()
      let notifications = await this.notificationRepository.getByUser(id)
      let activities = await this.activityRepository.getByUser(id)
      let res = []
      for (let item of generalNotifications) {
         let datetime = item.created_at.toISOString().substring(0,16).split(/T/gmi)
         let time = datetime[1]
         let date = datetime[0].split('-').reverse().join('/')
         res.push({
            body: item.description,
            date: `${time} - ${date}`,
            datetime: Date.parse(item.created_at.toISOString()),
            image: 'https://planetafacil.plenainclusion.org/wp-content/uploads/2020/04/bell-1096280_1280-820x820.png'
         })
      }
      for (let item of notifications) {
         let datetime = item.created_at.toISOString().substring(0,16).split(/T/gmi)
         let time = datetime[1]
         let date = datetime[0].split('-').reverse().join('/')
         res.push({
            body: item.description,
            date: `${time} - ${date}`,
            datetime: Date.parse(item.created_at.toISOString()),
            image: 'https://planetafacil.plenainclusion.org/wp-content/uploads/2020/04/bell-1096280_1280-820x820.png'
         })
      }
      for (let item of activities) {
         let datetime = item.created_at.toISOString().substring(0,16).split(/T/gmi)
         let time = datetime[1]
         let date = datetime[0].split('-').reverse().join('/')
         res.push({
            body: `${item.action} ${item.description}`,
            date: `${time} - ${date}`,
            datetime: Date.parse(item.created_at.toISOString()),
            image: 'https://planetafacil.plenainclusion.org/wp-content/uploads/2020/04/bell-1096280_1280-820x820.png'
         })
      }

      res.sort((a,b) => {
         return b.datetime - a.datetime
      })
      return res
   }

   // async update(id:number, request: any){

   //    const generalNotification = await this.generalNotificationRepository.update(id, request)

   //    return generalNotification;
   // }

   async delete(id: number){
      const generalNotification = await this.generalNotificationRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}