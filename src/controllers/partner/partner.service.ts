import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { PartnerRepository } from '../../modules/database/repositories/partnerRepository.service';
@Injectable()
export class PartnerService {

    constructor(
        private readonly partnerRepository: PartnerRepository
    ) {}

    async create(request: any){

      const partner = await this.partnerRepository.create(request)
      if (!partner) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   

      return partner;
   }

   async getAll(){
      const partners = await this.partnerRepository.getAll()
      return partners;
   }

   async getById(id:number){
      const partner = await this.partnerRepository.getById(id)
      return partner;
   }

   async update(id:number, request: any){

      const partner = await this.partnerRepository.update(id, request)

      return partner;
   }

   async delete(id: number){
      const partner = await this.partnerRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}