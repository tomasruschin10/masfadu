import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { PassportModule } from '@nestjs/passport';
import {CareerController} from "./career.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [CareerController],
    imports: [PassportModule,
         SharedModule],
    providers: [CareerService, FirestorageService],
})
export class CareerModule {}
