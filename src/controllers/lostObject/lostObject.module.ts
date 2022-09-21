import { Module } from '@nestjs/common';
import { LostObjectService } from './lostObject.service';
import { PassportModule } from '@nestjs/passport';
import {LostObjectController} from "./lostObject.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [LostObjectController],
    imports: [PassportModule,
         SharedModule],
    providers: [LostObjectService, FirestorageService],
})
export class LostObjectModule {}
