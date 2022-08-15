import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';

import { FeedbackService } from './feedback.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { feedbackBody } from './interfaces/feedback.interfaces';
import { feedbackDto, feedbackCreateDto, feedbackUpdateDto } from './dto/FeedbackDto.dto';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  
    constructor(private feedbackService: FeedbackService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: feedbackDto})
    async create(@Body() req : feedbackCreateDto) {
      const createBody: feedbackBody = req;
      return await this.feedbackService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: feedbackDto})
    async getAll() {
      return await this.feedbackService.getAll();
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: feedbackDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.feedbackService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: feedbackDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : feedbackUpdateDto) {
      const updateBody: feedbackBody = req;
      return await this.feedbackService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: feedbackDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.feedbackService.delete(id);
    }


}
