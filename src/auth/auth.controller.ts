import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { JwtAuthGuards } from './guards/jwt-auth.guards';




//---controller----//
@Controller('auth')
export class AuthController {

      constructor(private authService:AuthService){}

//----------register route------//
      @Post('register')
      async register(@Body() registerDto:Prisma.UserCreateInput):Promise<UserResponseDto> {
       return this.authService.register(registerDto);
    }

    //---------login route---------//
    @Post('login')
    async login(@Body() user:UserLoginDto){
       
        return this.authService.login(user);
    }




    //use guards for protecting the routes using jwt (jwt-statergy)
    @UseGuards(JwtAuthGuards)
    @Get(':id')
    async getUserById(@Param('id') id:number ,@Request() req:any ){  //we get user from the @Request body ,because we are sending it in jwt-statergy

        return req.user;
    }


    //-------refreshing token--------------//
    @Post('refresh')
    async refreshToken(@Body("refreshToken") refreshToken:string):Promise<string>{

        return  this.authService.refreshToken(refreshToken);
    }

    
}
