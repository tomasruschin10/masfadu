import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PassportModule } from '@nestjs/passport';
import {RoleController} from "./role.controller";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [RoleController],
    imports: [PassportModule,
         SharedModule],
    providers: [RoleService],
})
export class RoleModule {}
