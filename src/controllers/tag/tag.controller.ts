import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Headers} from '@nestjs/common';

import { TagService } from './tag.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { tagBody } from './interfaces/tag.interfaces';
import { tagDto, tagCreateDto, tagUpdateDto } from './dto/TagDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  
    constructor(private tagService: TagService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: tagDto})
    async create(@Body() req : tagCreateDto) {
      const createBody: tagBody = req;
      return await this.tagService.create(createBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('all/:id?')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: tagDto})
    async getAll() {
      return await this.tagService.getAll();
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: tagDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.tagService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: tagDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : tagUpdateDto, @UploadedFile() file: Express.Multer.File) {
      const updateBody: tagBody = req;
      return await this.tagService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: tagDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.tagService.delete(id);
    }
}
