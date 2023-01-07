import { Module } from '@nestjs/common';
import { GeneralNotificationService } from './generalNotification.service';
import { PassportModule } from '@nestjs/passport';
import {GeneralNotificationController} from "./generalNotification.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [GeneralNotificationController],
    imports: [PassportModule,
         SharedModule],
    providers: [GeneralNotificationService],
})
export class GeneralNotificationModule {}
