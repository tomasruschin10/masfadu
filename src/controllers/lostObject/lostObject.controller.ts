import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Headers, Query } from '@nestjs/common';

import { LostObjectService } from './lostObject.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { lostObjectBody } from './interfaces/lostObject.interfaces';
import { lostObjectDto, lostObjectCreateDto, lostObjectUpdateDto } from './dto/LostObjectDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirestorageService } from '../firestorage/firestorage.service';
import * as jwt from 'jsonwebtoken';

@ApiTags('LostObject')
@Controller('lost-object')
export class LostObjectController {

  constructor(
    private lostObjectService: LostObjectService,
    private firestorageService: FirestorageService
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 200, description: 'Correct Registration', type: lostObjectDto })
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() req: lostObjectCreateDto, @UploadedFile() image: Express.Multer.File, @Headers() header) {
    const data: any = jwt.decode(header.authorization.replace('Bearer ', ''));
    req.user_id = data.userData.id
    const createBody: lostObjectBody = req;
    let imageUploaded = await this.uploadFile(image)
    return await this.lostObjectService.create(createBody, imageUploaded);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all/:search?')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 200, description: 'Correct', type: lostObjectDto })
  async getAll(@Param('search') search) {
    console.log(search);

    return await this.lostObjectService.getAll(search);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Correct', type: lostObjectDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.lostObjectService.getById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Updated Registration', type: lostObjectDto })
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id', ParseIntPipe) id: number, @Body() req: lostObjectUpdateDto, @UploadedFile() image: Express.Multer.File) {
    const updateBody = req;
    let imageUploaded = image ? await this.uploadFile(image) : null
    return await this.lostObjectService.update(id, updateBody, imageUploaded);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Record Removed', type: lostObjectDto })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.lostObjectService.delete(id);
  }

  async uploadFile(file) {
    if (!file) throw new BadRequestException(['Image file is required'])
    return await this.firestorageService.uploadFile('offers', file, Date.now());
  }
}
