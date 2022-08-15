import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { PassportModule } from '@nestjs/passport';
import {OfferController} from "./offer.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [OfferController],
    imports: [PassportModule,
         SharedModule],
    providers: [OfferService, FirestorageService],
})
export class OfferModule {}
