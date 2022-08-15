import {Body, Controller, Get, Post, UseGuards, Param, ParseIntPipe, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userDto } from './dto/UserDto.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // @UseGuards(JwtAuthGuard)
    @Get('all/:id?')
    @ApiParam({name: 'id', required: true, description: 'Role identifier (optional)'})
    @ApiResponse({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: userDto})
    async getUsers(@Param('id') id: number) {
      return await this.userService.getAll(id);
    }


    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: userDto})
    async findUser(@Param('id', ParseIntPipe) id: number) {
      return await this.userService.findById(id);
    }


}
