import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Offer } from '../../../models/offer.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class OfferRepository {
    constructor(
        @Inject('OFFER_REPOSITORY')
        private offersRepository: Repository<Offer>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save offer
        const offer = await this.offersRepository.create(request)
        await this.offersRepository.save(offer)

        //return
        return offer
    }

    async getAll(career, search): Promise<Offer[] | string> {
        let query = 'o.offer_category_id != 1 AND o.offer_category_id != 2'
        career ? query += ` AND o.career_id = ${career}` : ''
        search ? query += ` AND (o.description LIKE '%${search}%' OR o.title LIKE '%${search}%')` : ''

        return await this.offersRepository.createQueryBuilder('o')
            .innerJoinAndSelect('o.offerCategory', 'oo')
            .leftJoinAndSelect('o.image', 'oi')
            .leftJoinAndSelect('o.partner', 'op')
            .leftJoinAndSelect('o.career', 'os')
            .where(query)
            .orderBy('o.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Offer | string> {
        const offer = await this.offersRepository.createQueryBuilder('o')
            .innerJoinAndSelect('o.offerCategory', 'oo')
            .leftJoinAndSelect('o.image', 'oi')
            .leftJoinAndSelect('o.partner', 'op')
            .leftJoinAndSelect('o.career', 'oc')
            .where(`o.id = ${id}`)
            .getOne()
        if (!offer) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return offer;
    }


    async update(id: number, request): Promise<any> {
        let offer = await this.offersRepository.findOne(id);
        if (!offer)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        offer = await this.sharedService.updateObject(offer, request)

        await this.offersRepository.save(offer);

        return offer;
    }

    async delete(id): Promise<any> {
        const offer = await this.offersRepository.findOne(id);
        if (!offer)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.offersRepository.delete(offer.id);

        return offer;

    }

    async getWorkOffers(career, search): Promise<Offer[] | string> {
        let query = "o.offer_category_id = 1"
        if (career) query += ` AND o.career_id = ${career}`
        if (search) query += ` AND (o.description LIKE '%${search}%' OR o.title LIKE '%${search}%')`
        
        return await this.offersRepository.createQueryBuilder('o')
            .innerJoinAndSelect('o.offerCategory', 'oo')
            .leftJoinAndSelect('o.image', 'oi')
            .leftJoinAndSelect('o.partner', 'op')
            .leftJoinAndSelect('o.career', 'oc')
            .where(query)
            .orderBy('o.id', 'DESC')
            .getMany()
    }

    async getCourseOffers(career, search): Promise<Offer[] | string> {
        let query = "o.offer_category_id = 2"
        if (career) query += ` AND o.career_id = ${career}`
        if (search) query += ` AND (o.description LIKE '%${search}%' OR o.title LIKE '%${search}%')`
        
        return await this.offersRepository.createQueryBuilder('o')
            .innerJoinAndSelect('o.offerCategory', 'oo')
            .leftJoinAndSelect('o.image', 'oi')
            .leftJoinAndSelect('o.partner', 'op')
            .leftJoinAndSelect('o.career', 'oc')
            .where(query)
            .orderBy('o.id', 'DESC')
            .getMany()
    }
}