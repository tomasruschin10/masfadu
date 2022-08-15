import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { PassportModule } from '@nestjs/passport';
import {AdvertisementController} from "./advertisement.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [AdvertisementController],
    imports: [PassportModule,
         SharedModule],
    providers: [AdvertisementService, FirestorageService],
})
export class AdvertisementModule {}
