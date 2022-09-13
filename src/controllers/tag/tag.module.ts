import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { PassportModule } from '@nestjs/passport';
import {TagController} from "./tag.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [TagController],
    imports: [PassportModule,
         SharedModule],
    providers: [TagService, FirestorageService],
})
export class TagModule {}
