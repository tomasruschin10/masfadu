import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { PassportModule } from '@nestjs/passport';
import {NoticeController} from "./notice.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [NoticeController],
    imports: [PassportModule,
         SharedModule],
    providers: [NoticeService],
})
export class NoticeModule {}
