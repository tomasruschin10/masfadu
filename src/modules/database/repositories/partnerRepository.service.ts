import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Partner } from '../../../models/partner.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class PartnerRepository {
    constructor(
        @Inject('PARTNER_REPOSITORY')
        private partnersRepository: Repository<Partner>,
        private sharedService: SharedService
    ) {}


    async create(request): Promise<any>{
        //save partner
        const partner = await this.partnersRepository.create(request)
        await this.partnersRepository.save(partner)
        
        //return
        return partner
    }

    async getAll(): Promise<Partner[] | string> {
        return await this.partnersRepository.createQueryBuilder('p')
        .orderBy('p.id', 'DESC')
        .getMany()
    }


    async getById(id): Promise<Partner | string> {
        const partner = await this.partnersRepository.findOne(id)
        if (!partner) {
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        }
        return partner;
    }


    async update(id: number, request): Promise<any> {
        let partner = await this.partnersRepository.findOne(id);
        if (!partner)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        
        partner = await this.sharedService.updateObject(partner, request)

        await this.partnersRepository.save(partner);

        return partner;
    }

    async delete(id): Promise<any> {
        const partner = await this.partnersRepository.findOne(id);
        if (!partner)
            throw new HttpException('error! record not found',HttpStatus.NOT_FOUND); 
        await this.partnersRepository.delete(partner.id);

        return partner;

    }

}