import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { BalancePartnerRepository } from 'src/modules/database/repositories/balancePartnerRepository.service';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { BalanceRepository } from '../../modules/database/repositories/balanceRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class BalanceService {

    constructor(
        private readonly balanceRepository: BalanceRepository,
        private readonly balancePartnerRepository: BalancePartnerRepository,
        private readonly imageRepository: ImageRepository,
        private firestorageService: FirestorageService
    ) {}

    async create(request: any){
      const balance = await this.balanceRepository.create(request)
      if (!balance) throw new HttpException('incorrect data',HttpStatus.BAD_REQUEST)   
      await this.balancePartnerRepository.saveBalancePartner(balance.id, request.partner_id)

      return balance;
   }

   async getAll(){
      const balances = await this.balanceRepository.getAll()
      return balances;
   }

   async getById(id:number){
      const balance = await this.balanceRepository.getById(id)
      return balance;
   }

   async update(id:number, request: any, file){

      const balance = await this.balanceRepository.update(id, request)

      if (file) {
         await this.deleteFirebase(balance.image_id)
         await this.imageRepository.update(balance.image_id, file)
      }

      return balance;
   }

   async delete(id: number){
      const balance = await this.balanceRepository.delete(id)
      await this.deleteFirebase(balance.image_id)
      await this.imageRepository.delete(balance.image_id)

      return {statusCode: 200, message: 'removed'}
   }

   async deleteFirebase(image_id) {
      let image = await this.imageRepository.getById(image_id)

      image? await this.firestorageService.remove(image.name): null
      return true
   }     

}