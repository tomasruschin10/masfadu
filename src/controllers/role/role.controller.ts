import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';

import { RoleService } from './role.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { roleBody } from './interfaces/role.interfaces';
import { roleDto, roleCreateDto } from './dto/RoleDto.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  
    constructor(private roleService: RoleService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: roleDto})
    async create(@Body() req : roleCreateDto) {
      const createBody: roleBody = req;
      return await this.roleService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: roleDto})
    async getAll() {
      return await this.roleService.getAll();
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: roleDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.roleService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: roleDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : roleCreateDto) {
      const updateBody: roleBody = req;
      return await this.roleService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: roleDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.roleService.delete(id);
    }


}
