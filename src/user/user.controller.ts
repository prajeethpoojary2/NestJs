import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, Request, UseGuards } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuards } from 'src/auth/guards/jwt-auth.guards';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}


    @UseGuards(JwtAuthGuards)
    @Get('profile')
    async getUserById(@Request() req:any ):Promise<UserResponseDto>{
          return this.userService.getUserById(req.user.id);
    }



   // needs fix gets all user if quert not given -imp
    @UseGuards(JwtAuthGuards)
    @Get()
    async getAllUser(@Query('name') name:string):Promise<UserResponseDto[]>{
      return this.userService.getAllUser(name);

    }



    @UseGuards(JwtAuthGuards)
    @Patch('update')
    async updateUser(@Body() updateUserDto:Prisma.UserUpdateInput,@Request() req:any ):Promise<UserResponseDto>{
            return this.userService.updateUser(updateUserDto,req.user);
    }



    @UseGuards(JwtAuthGuards)
    @Delete('delete')
    async deleteUser(@Request() req:any){
        return this.userService.deleteUser(req.user.id);
    }

    
}
