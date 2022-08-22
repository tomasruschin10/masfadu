import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Balance } from '../../../models/balance.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class BalanceRepository {
    constructor(
        @Inject('BALANCE_REPOSITORY')
        private balancesRepository: Repository<Balance>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save balance
        const balance = await this.balancesRepository.create(request)
        await this.balancesRepository.save(balance)

        //return
        return balance
    }

    async getAll(): Promise<Balance[] | string> {
        return await this.balancesRepository.createQueryBuilder('c')
            .innerJoinAndSelect('c.image', 'ci')
            .getMany()
    }


    async getById(id): Promise<Balance | string> {
        const balance = await this.balancesRepository.createQueryBuilder('c')
            .innerJoinAndSelect('c.image', 'ci')
            .where(`c.id = ${id}`)
            .getOne()
        if (!balance) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return balance;
    }


    async update(id: number, request): Promise<any> {
        let balance = await this.balancesRepository.findOne(id);
        if (!balance)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        balance = await this.sharedService.updateObject(balance, request)

        await this.balancesRepository.save(balance);

        return balance;
    }

    async delete(id): Promise<any> {
        const balance = await this.balancesRepository.findOne(id);
        if (!balance)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.balancesRepository.delete(balance.id);

        return balance;

    }

}