import { Module } from '@nestjs/common';
import { OpinionService } from './opinion.service';
import { PassportModule } from '@nestjs/passport';
import {OpinionController} from "./opinion.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [OpinionController],
    imports: [PassportModule,
         SharedModule],
    providers: [OpinionService, FirestorageService],
})
export class OpinionModule {}
