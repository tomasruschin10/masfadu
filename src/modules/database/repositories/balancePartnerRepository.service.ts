import { Injectable, Inject } from '@nestjs/common';
import { Repository } from "typeorm";
import { BalancePartner } from '../../../models/balancePartner.entity';
@Injectable()
export class BalancePartnerRepository {
    constructor(
        @Inject('BALANCE_PARTNER_REPOSITORY')
        private balanceRolesRepository: Repository<BalancePartner>
    ) { }


    async saveBalancePartner(balance_id: number, partner_id: number): Promise<any> {
        //save balance partner
        const balance_partner = await this.balanceRolesRepository.create({ balance_id: balance_id, partner_id: partner_id })
        await this.balanceRolesRepository.save(balance_partner)

        //return
        return balance_partner
    }
}