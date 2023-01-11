import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { GeneralNotification } from '../../../models/generalNotification.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class GeneralNotificationRepository {
    constructor(
        @Inject('GENERAL_NOTIFICATION_REPOSITORY')
        private generalNotificationsRepository: Repository<GeneralNotification>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save generalNotification
        const generalNotification = await this.generalNotificationsRepository.create(request)
        await this.generalNotificationsRepository.save(generalNotification)

        //return
        return generalNotification
    }

    async getAll(): Promise<GeneralNotification[] | string> {
        return await this.generalNotificationsRepository.createQueryBuilder('r')
            .orderBy('r.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<GeneralNotification | string> {
        const generalNotification = await this.generalNotificationsRepository.findOne(id)
        if (!generalNotification) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return generalNotification;
    }


    async update(id: number, request): Promise<any> {
        let generalNotification = await this.generalNotificationsRepository.findOne(id);
        if (!generalNotification)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        generalNotification = await this.sharedService.updateObject(generalNotification, request)

        await this.generalNotificationsRepository.save(generalNotification);

        return generalNotification;
    }

    async delete(id): Promise<any> {
        const generalNotification = await this.generalNotificationsRepository.findOne(id);
        if (!generalNotification)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.generalNotificationsRepository.delete(generalNotification.id);

        return generalNotification;

    }

    async getLimit(): Promise<GeneralNotification[]> {
        return await this.generalNotificationsRepository.createQueryBuilder('r')
            .orderBy('r.id', 'DESC')
            .limit(50)
            .getMany()
    }

}