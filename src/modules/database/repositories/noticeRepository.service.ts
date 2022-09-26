import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Notice } from '../../../models/notice.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class NoticeRepository {
    constructor(
        @Inject('NOTICE_REPOSITORY')
        private noticesRepository: Repository<Notice>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save notice
        const notice = await this.noticesRepository.create(request)
        await this.noticesRepository.save(notice)
        
        //return
        return notice
    }

    async getAll(active): Promise<Notice[] | string> {
        let date = new Date(Date.now()).toISOString()
        return await this.noticesRepository.createQueryBuilder('n')
            .innerJoinAndSelect('n.image', 'ni')
            .where(active && active == 'active' ? `n.date_start <= '${date}' && n.date_end >= '${date}'`:'')
            .orderBy('n.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Notice | string> {
        const notice = await this.noticesRepository.createQueryBuilder('n')
            .innerJoinAndSelect('n.image', 'ni')
            .where(`n.id = ${id}`)
            .getOne()
        if (!notice) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return notice;
    }


    async update(id: number, request): Promise<any> {
        let notice = await this.noticesRepository.findOne(id);
        if (!notice)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        notice = await this.sharedService.updateObject(notice, request)

        await this.noticesRepository.save(notice);

        return notice;
    }

    async delete(id): Promise<any> {
        const notice = await this.noticesRepository.findOne(id);
        if (!notice)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.noticesRepository.delete(notice.id);

        return notice;

    }

}