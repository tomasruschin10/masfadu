import { Module } from '@nestjs/common';
import { OfferCategoryService } from './offerCategory.service';
import { PassportModule } from '@nestjs/passport';
import {OfferCategoryController} from "./offerCategory.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [OfferCategoryController],
    imports: [PassportModule,
         SharedModule],
    providers: [OfferCategoryService],
})
export class OfferCategoryModule {}
