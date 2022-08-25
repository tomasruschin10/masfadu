import { Module, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/providers/database.providers';
import { repositories } from './providers/repositories.providers';
import { SharedService } from './shared.service';

@Module({
    imports: [ DatabaseModule, HttpModule,],
  providers: [ SharedService, ...databaseProviders, ...repositories ],
  exports: [...repositories, SharedService],
})
export class SharedModule {}
