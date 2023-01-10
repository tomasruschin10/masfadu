import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Query} from '@nestjs/common';

import { AdvertisementService } from './advertisement.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { advertisementBody } from './interfaces/advertisement.interfaces';
import { advertisementDto, advertisementCreateDto, advertisementUpdateDto } from './dto/AdvertisementDto.dto';
import { FirestorageService } from '../firestorage/firestorage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Advertisement')
@Controller('advertisement')
export class AdvertisementController {
  
    constructor(private advertisementService: AdvertisementService, private firestorageService: FirestorageService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: advertisementDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() req : advertisementCreateDto, @UploadedFile() file: Express.Multer.File) {
      const createBody: advertisementBody = req;
      let fileUploaded = await this.uploadFile(file)
      return await this.advertisementService.create(createBody, fileUploaded);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all/:active?')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: advertisementDto})
    async getAll(@Param('active') active: string, @Query('key') key: string) {
      if (key) return await this.advertisementService.getByKey(key);
      return await this.advertisementService.getAll(active);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: advertisementDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.advertisementService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: advertisementDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : advertisementUpdateDto, @UploadedFile() file: Express.Multer.File) {
      const updateBody: advertisementBody = req;
      let fileUploaded = file ? await this.uploadFile(file) : null
      return await this.advertisementService.update(id, updateBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: advertisementDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.advertisementService.delete(id);
    }

    async uploadFile(file) {
      if(file){
        let tm = Date.now();
        return await this.firestorageService.uploadFile('advertisements', file, tm);
      }else{
        throw new BadRequestException(['Image file is required'])
      }
    }

}
