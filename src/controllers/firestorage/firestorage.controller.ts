import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FirestorageService } from './firestorage.service';
import { CreateFirestorageDto } from './dto/create-firestorage.dto';
import { UpdateFirestorageDto } from './dto/update-firestorage.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('firestorage')
export class FirestorageController {
  constructor(private readonly firestorageService: FirestorageService) {}

  // @Post()
  // create(@Body() createFirestorageDto: CreateFirestorageDto) {
  //   return this.firestorageService.create(createFirestorageDto);
  // }

  @Get()
  findAll() {
    return this.firestorageService.findAll();
  }

  @Post(':bucket')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param('bucket') bucket: string, @UploadedFile() file: any) {
    return this.firestorageService.uploadFile(bucket,file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFirestorageDto: UpdateFirestorageDto) {
    return this.firestorageService.update(+id, updateFirestorageDto);
  }

  @Delete('delete')
  remove(@Query('bucket') bucket: string) {
    return this.firestorageService.remove(bucket);
  }
}
