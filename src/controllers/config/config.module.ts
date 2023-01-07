import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { PassportModule } from '@nestjs/passport';
import {ConfigController} from "./config.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [ConfigController],
    imports: [PassportModule,
         SharedModule],
    providers: [ConfigService],
})
export class ConfigModule {}
