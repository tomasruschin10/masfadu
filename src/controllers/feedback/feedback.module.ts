import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { PassportModule } from '@nestjs/passport';
import {FeedbackController} from "./feedback.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [FeedbackController],
    imports: [PassportModule,
         SharedModule],
    providers: [FeedbackService],
})
export class FeedbackModule {}
