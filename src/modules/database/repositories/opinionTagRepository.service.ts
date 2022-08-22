import { Injectable, Inject } from '@nestjs/common';
import { Repository } from "typeorm";
import { OpinionTag } from '../../../models/opinionTag.entity';
@Injectable()
export class OpinionTagRepository {
    constructor(
        @Inject('OPINION_TAG_REPOSITORY')
        private opinionTagsRepository: Repository<OpinionTag>
    ) { }


    async saveOpinionTag(opinion_id: number, tag_id: number): Promise<any> {
        //save opinion tag
        const opinion_tag = await this.opinionTagsRepository.create({ opinion_id: opinion_id, tag_id: tag_id })
        await this.opinionTagsRepository.save(opinion_tag)

        //return
        return opinion_tag
    }
}