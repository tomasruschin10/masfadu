import { Module } from '@nestjs/common';
import { OpinionAnswerService } from './opinionAnswer.service';
import { PassportModule } from '@nestjs/passport';
import {OpinionAnswerController} from "./opinionAnswer.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [OpinionAnswerController],
    imports: [PassportModule,
         SharedModule],
    providers: [OpinionAnswerService],
})
export class OpinionAnswerModule {}
