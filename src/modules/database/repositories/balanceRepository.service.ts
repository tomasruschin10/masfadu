import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Connection, Repository } from "typeorm";
import { Balance } from '../../../models/balance.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class BalanceRepository {
    constructor(
        @Inject('BALANCE_REPOSITORY')
        private balancesRepository: Repository<Balance>,
        private sharedService: SharedService,
        private conection: Connection
    ) { }


    async create(request): Promise<any> {
        //save balance
        const balance = await this.balancesRepository.create(request)
        await this.balancesRepository.save(balance)

        //return
        return balance
    }

    async getAll(id): Promise<Balance[] | any> {
        let res = {data: null, total: null}
        let balance =  await this.balancesRepository.createQueryBuilder('c')
            .leftJoinAndSelect('c.offer', 'co')
            .leftJoinAndSelect('co.partner', 'cop')
            .leftJoinAndSelect('co.offerCategory', 'coo')
            .where(id ? `co.partner_id = ${id}` : '')
            .orderBy('c.id', 'DESC')
            .getMany()
        
        let total = await this.conection.query(`SELECT sum(c.amount) as total from balances as c inner join offers as co on co.id = c.offer_id ${id ? `where co.partner_id = ${id}` : ''}`)
        res.data = balance
        res.total = parseInt(total[0].total)
        return res
    }


    async getById(id): Promise<Balance | string> {
        const balance = await this.balancesRepository.createQueryBuilder('c')
            .leftJoinAndSelect('c.offer', 'co')
            .leftJoinAndSelect('co.partner', 'cop')
            .leftJoinAndSelect('co.offerCategory', 'coo')
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