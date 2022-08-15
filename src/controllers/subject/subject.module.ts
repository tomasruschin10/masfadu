import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { PassportModule } from '@nestjs/passport';
import {SubjectController} from "./subject.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [SubjectController],
    imports: [PassportModule,
         SharedModule],
    providers: [SubjectService],
})
export class SubjectModule {}
