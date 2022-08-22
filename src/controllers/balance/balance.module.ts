import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { PassportModule } from '@nestjs/passport';
import {BalanceController} from "./balance.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [BalanceController],
    imports: [PassportModule,
         SharedModule],
    providers: [BalanceService, FirestorageService],
})
export class BalanceModule {}
