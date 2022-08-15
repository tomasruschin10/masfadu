import { Module } from '@nestjs/common';
import { SubjectCategoryService } from './subjectCategory.service';
import { PassportModule } from '@nestjs/passport';
import {SubjectCategoryController} from "./subjectCategory.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [SubjectCategoryController],
    imports: [PassportModule,
         SharedModule],
    providers: [SubjectCategoryService],
})
export class SubjectCategoryModule {}
