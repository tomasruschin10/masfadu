import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { ActivityRepository } from 'src/modules/database/repositories/activityRepository.service';
import { OpinionRepository } from 'src/modules/database/repositories/opinionRepository.service';
import { UserRepository } from 'src/modules/database/repositories/userRepository.service';
import { SharedService } from 'src/modules/shared/shared.service';
import { OpinionAnswerRepository } from '../../modules/database/repositories/opinionAnswerRepository.service';
@Injectable()
export class OpinionAnswerService {

   constructor(
      private readonly opinionAnswerRepository: OpinionAnswerRepository,
      private readonly activityRepository: ActivityRepository,
      private readonly userRepository: UserRepository,
      private readonly opinionRepository: OpinionRepository,
      private readonly sharedService: SharedService,
   ) { }

   async create(request: any, user_id: any, header) {
      request.student_id = user_id
      const opinionAnswer = await this.opinionAnswerRepository.create(request)
      if (!opinionAnswer) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)

      await this.createActivity(request, user_id, header)
      return opinionAnswer;
   }
   //{ description: 'hola', opinion_id: 2, student_id: 1 }

   async createActivity(request: any, user_id: any, header: any) {
      let recipient_id = (await this.opinionRepository.getById(request.opinion_id)).student_id
      let recipient = (await this.userRepository.findById(recipient_id)).username
      let sender = (await this.userRepository.findById(request.student_id)).username

      let activity = {
         user_id: user_id,
         action: 'Comentaste',
         description: `el hilo de @${recipient}`,
         type: 'Comentario'
      }
      await this.activityRepository.create(activity)


      let notification = {
         title: 'Te han respondido',
         user_to: recipient_id,
         message:`¡Hey, @${sender} comentó en tu hilo!`
      }
      await this.sharedService.sendNotification(notification, header)

   }

   async getAll(data) {
      const opinionAnswers = await this.opinionAnswerRepository.getAll(data)
      return opinionAnswers;
   }

   async getById(id: number) {
      const opinionAnswer = await this.opinionAnswerRepository.getById(id)
      return opinionAnswer;
   }

   async update(id: number, request: any) {

      const opinionAnswer = await this.opinionAnswerRepository.update(id, request)

      return opinionAnswer;
   }

   async delete(id: number) {
      const opinionAnswer = await this.opinionAnswerRepository.delete(id)


      return { statusCode: 200, message: 'removed' }
   }



}