import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { ImageRepository } from 'src/modules/database/repositories/imageRepository.service';
import { BalanceRepository } from '../../modules/database/repositories/balanceRepository.service';
import { FirestorageService } from '../firestorage/firestorage.service';
@Injectable()
export class BalanceService {

   constructor(
      private readonly balanceRepository: BalanceRepository,
      private readonly imageRepository: ImageRepository,
      private firestorageService: FirestorageService
   ) { }

   async create(request: any) {
      const balance = await this.balanceRepository.create(request)
      if (!balance) throw new HttpException('incorrect data', HttpStatus.BAD_REQUEST)
      return await this.getById(balance.id);
   }

   async getAll(id) {
      let balances = await this.balanceRepository.getAll(id) 
      return balances;
   }

   async getById(id: number) {
      const balance = await this.balanceRepository.getById(id)
      return balance;
   }

   async totalAmount(balances) {
      let total
      for (let balance of balances) {
         total += balance.amount
      }
      return total;
   }

   async update(id: number, request: any) {

      const balance = await this.balanceRepository.update(id, request)

      return await this.getById(balance.id);
   }

   async delete(id: number) {
      const balance = await this.balanceRepository.delete(id)

      return { statusCode: 200, message: 'removed' }
   }

}