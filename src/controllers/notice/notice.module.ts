import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { PassportModule } from '@nestjs/passport';
import {NoticeController} from "./notice.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [NoticeController],
    imports: [PassportModule,
         SharedModule],
    providers: [NoticeService, FirestorageService],
})
export class NoticeModule {}
