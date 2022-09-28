import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { Tag } from '../../../models/tag.entity';
import { SharedService } from 'src/modules/shared/shared.service';
@Injectable()
export class TagRepository {
    constructor(
        @Inject('TAG_REPOSITORY')
        private tagsRepository: Repository<Tag>,
        private sharedService: SharedService
    ) { }


    async create(request): Promise<any> {
        //save tag
        const tag = await this.tagsRepository.create(request)
        await this.tagsRepository.save(tag)

        //return
        return tag
    }

    async findTag(tag: string): Promise<Tag> {
        return this.tagsRepository.createQueryBuilder('t')
            .where(`t.name = '${tag}' OR t.id = '${tag}'`)
            .getOne();
    }

    async getAll(): Promise<Tag[] | string> {
        return await this.tagsRepository.createQueryBuilder('t')
            .orderBy('t.id', 'DESC')
            .getMany()
    }


    async getById(id): Promise<Tag | string> {
        const tag = await this.tagsRepository.createQueryBuilder('t')
            .where(`t.id = ${id}`)
            .getOne()
        if (!tag) {
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        }
        return tag;
    }



    async update(id: number, request): Promise<any> {
        let tag = await this.tagsRepository.findOne(id);
        if (!tag)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);

        tag = await this.sharedService.updateObject(tag, request)

        await this.tagsRepository.save(tag);

        return tag;
    }

    async delete(id): Promise<any> {
        const tag = await this.tagsRepository.findOne(id);
        if (!tag)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.tagsRepository.delete(tag.id);

        return tag;

    }

}