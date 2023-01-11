import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Activity } from '../../../models/activity.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class ActivityRepository {
    constructor(
        @Inject('ACTIVITY_REPOSITORY')
        private activitysRepository: Repository<Activity>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save activity
        const activity = await this.activitysRepository.create(request)
        await this.activitysRepository.save(activity)

        //return
        return activity
    }

    async getAll(id): Promise<Activity[] | string> {
        return await this.activitysRepository.createQueryBuilder('a')
            .where(id ? `a.user_id = ${id}` : '')
            .orderBy('a.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Activity | string> {
        const activity = await this.activitysRepository.findOne(id)
        if (!activity) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return activity;
    }


    async update(id: number, request): Promise<any> {
        let activity = await this.activitysRepository.findOne(id);
        if (!activity)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        activity = await this.sharedService.updateObject(activity, request)

        await this.activitysRepository.save(activity);

        return activity;
    }

    async delete(id): Promise<any> {
        const activity = await this.activitysRepository.findOne(id);
        if (!activity)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.activitysRepository.delete(activity.id);

        return activity;

    }

    async getByUser(user): Promise<Activity[]> {
        return await this.activitysRepository.createQueryBuilder('a')
            .where(`a.user_id = ${user}`)
            .orderBy('a.id', 'DESC')
            .limit(50)
            .getMany()
    }

}