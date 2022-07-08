import { Module } from '@nestjs/common';
import { FirestorageService } from './firestorage.service';
import { FirestorageController } from './firestorage.controller';

@Module({
  controllers: [FirestorageController],
  providers: [FirestorageService]
})
export class FirestorageModule {}
