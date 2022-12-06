import { Module } from '@nestjs/common';
import { ExtraScoreService } from './extraScore.service';
import { PassportModule } from '@nestjs/passport';
import {ExtraScoreController} from "./extraScore.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [ExtraScoreController],
    imports: [PassportModule,
         SharedModule],
    providers: [ExtraScoreService],
})
export class ExtraScoreModule {}
