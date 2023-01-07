import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { ConfigRepository } from '../../modules/database/repositories/configRepository.service';
@Injectable()
export class ConfigService {

    constructor(
        private readonly configRepository: ConfigRepository
    ) {}

    async create(request: any){

      const config = await this.configRepository.create(request)
      if (!config) throw new BadRequestException(['incorrect data'])     

      return config;
   }

   async getAll(){
      const configs = await this.configRepository.getAll()
      return configs;
   }

   async getById(id:number){
      const config = await this.configRepository.getById(id)
      return config;
   }

   async update(id:number, request: any){

      const config = await this.configRepository.update(id, request)

      return config;
   }

   async delete(id: number){
      const config = await this.configRepository.delete(id)


      return {statusCode: 200, message: 'removed'}
   }

     

}