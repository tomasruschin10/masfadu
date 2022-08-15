import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PassportModule } from '@nestjs/passport';
import {PartnerController} from "./partner.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [PartnerController],
    imports: [PassportModule,
         SharedModule],
    providers: [PartnerService],
})
export class PartnerModule {}
