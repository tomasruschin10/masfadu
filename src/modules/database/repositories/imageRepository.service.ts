import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {Repository} from "typeorm";
import { Image } from '../../../models/image.entity';
@Injectable()
export class ImageRepository {
    constructor(
        @Inject('IMAGE_REPOSITORY')
        private imagesRepository: Repository<Image>
    ) {}

    async create(request): Promise<any>{
        //save image
        const image = await this.imagesRepository.create(request)
        await this.imagesRepository.save(image)
        
        //return
        return image
    }


    async update(id: number, request): Promise<any> {
        const image = await this.imagesRepository.findOne(id);
        if (!image) throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        
            request.url ? image.url = request.url : null
            request.name ? image.name = request.name : null

        await this.imagesRepository.save(image);

        return image;
    }

    async delete(id): Promise<any> {
        const image = await this.imagesRepository.findOne(id);
        if (!image) throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.imagesRepository.delete(image.id);

        return image;

    }

    async getById(id: number) {
        return await this.imagesRepository.findOne(id);
    }

}