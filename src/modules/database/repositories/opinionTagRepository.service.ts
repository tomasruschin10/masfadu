import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from "typeorm";
import { OpinionTag } from '../../../models/opinionTag.entity';
@Injectable()
export class OpinionTagRepository {
    constructor(
        @Inject('OPINION_TAG_REPOSITORY')
        private opinionTagsRepository: Repository<OpinionTag>
    ) { }


    async create(opinion_id: number, tag_id: number): Promise<any> {
        //save opinion tag
        const opinion_tag = await this.opinionTagsRepository.create({ opinion_id: opinion_id, tag_id: tag_id })
        await this.opinionTagsRepository.save(opinion_tag)

        //return
        return opinion_tag
    }

    async delete(id): Promise<any> {
        const opinion_tag = await this.opinionTagsRepository.findOne(id);
        if (!opinion_tag)
            throw new HttpException('error! record not found', HttpStatus.NOT_FOUND);
        await this.opinionTagsRepository.delete(opinion_tag.id);

        return opinion_tag;

    }

}