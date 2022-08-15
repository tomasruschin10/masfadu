import { Module } from '@nestjs/common';
import { UserSubjectService } from './userSubject.service';
import { PassportModule } from '@nestjs/passport';
import {UserSubjectController} from "./userSubject.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [UserSubjectController],
    imports: [PassportModule,
         SharedModule],
    providers: [UserSubjectService],
})
export class UserSubjectModule {}
