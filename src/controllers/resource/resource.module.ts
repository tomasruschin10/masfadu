import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { PassportModule } from '@nestjs/passport';
import {ResourceController} from "./resource.controller";
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';

@Module({
    controllers: [ResourceController],
    imports: [PassportModule,
         SharedModule],
    providers: [ResourceService, FirestorageService],
})
export class ResourceModule {}
