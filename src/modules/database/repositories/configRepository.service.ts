import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Config } from '../../../models/config.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class ConfigRepository {
    constructor(
        @Inject('CONFIG_REPOSITORY')
        private configsRepository: Repository<Config>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save config
        const config = await this.configsRepository.create(request)
        await this.configsRepository.save(config)

        //return
        return config
    }

    async getAll(): Promise<Config[] | string> {
        return await this.configsRepository.createQueryBuilder('r')
            .orderBy('r.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Config | string> {
        const config = await this.configsRepository.findOne(id)
        if (!config) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return config;
    }


    async update(id: number, request): Promise<any> {
        let config = await this.configsRepository.findOne(id);
        if (!config)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        config = await this.sharedService.updateObject(config, request)

        await this.configsRepository.save(config);

        return config;
    }

    async delete(id): Promise<any> {
        const config = await this.configsRepository.findOne(id);
        if (!config)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.configsRepository.delete(config.id);

        return config;

    }

}