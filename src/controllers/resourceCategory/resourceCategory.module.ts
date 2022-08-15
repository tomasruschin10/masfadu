import { Module } from '@nestjs/common';
import { ResourceCategoryService } from './resourceCategory.service';
import { PassportModule } from '@nestjs/passport';
import {ResourceCategoryController} from "./resourceCategory.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [ResourceCategoryController],
    imports: [PassportModule,
         SharedModule],
    providers: [ResourceCategoryService],
})
export class ResourceCategoryModule {}
