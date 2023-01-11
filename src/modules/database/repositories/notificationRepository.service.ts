import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Notification } from '../../../models/notification.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class NotificationRepository {
    constructor(
        @Inject('NOTIFICATION_REPOSITORY')
        private notificationsRepository: Repository<Notification>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save notification
        const notification = await this.notificationsRepository.create(request)
        await this.notificationsRepository.save(notification)
        
        //return
        return notification
    }

    async getAll(): Promise<Notification[] | string> {
        return await this.notificationsRepository.createQueryBuilder('n')
        .orderBy('n.id', 'DESC')
        .getMany()
    }


    async getById(id): Promise<Notification | string> {
        const notification = await this.notificationsRepository.findOne(id)
        if (!notification) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return notification;
    }


    async update(id: number, request): Promise<any> {
        let notification = await this.notificationsRepository.findOne(id);
        if (!notification)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        notification = await this.sharedService.updateObject(notification, request)

        await this.notificationsRepository.save(notification);

        return notification;
    }

    async delete(id): Promise<any> {
        const notification = await this.notificationsRepository.findOne(id);
        if (!notification)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.notificationsRepository.delete(notification.id);

        return notification;

    }

    async getByUser(user): Promise<Notification[]> {
        return await this.notificationsRepository.createQueryBuilder('n')
        .where(`n.user_id = ${user}`)
        .orderBy('n.id', 'DESC')
        .limit(50)
        .getMany()
    }

}