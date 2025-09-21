import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { $Enums, Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/user/dto/user-login.dto';





@Injectable()
export class AuthService {

    constructor(private database:DatabaseService,private jwtService:JwtService){}

    //---------REGISTER-----------//
    async register(createUser:Prisma.UserCreateInput):Promise<UserResponseDto>{

      const checkuser =await this.database.user.findUnique({
            where:{email:createUser.email}
        })
        if(checkuser){
            throw new ConflictException("user exists");
        }

        const hashedPassword= await this.hashedPassword(createUser.password);
        
        const {password,...user}=await this.database.user.create({
            data:{
                 email: createUser.email,
                 name: createUser.name,
                 password: hashedPassword,
                 role: createUser.role
            }
        });

        return UserResponseDto.fromUser(user);
    }


    //--------login-------------//
    async login(user:UserLoginDto){

        const findUser = await this.database.user.findUnique({
            where:{email:user.email}
        })

        if(!findUser || (await this.verifyPassword(user.password,findUser.password))){
            throw new NotFoundException("user not found or Incorrect password");
        }
        const tokens=await this.generateToken(findUser);
        return {
            user:UserResponseDto.fromUser(findUser),
            ...tokens
            
        }

    }

    //------------getting user by id--------//
    async getUserById(userId:number):Promise<UserResponseDto>{

        const user = await this.database.user.findUnique({
            where:{id:userId}
        })

        if(!user){
            throw new NotFoundException("user not found");
        }
        return UserResponseDto.fromUser(user);
    }


    //-------------generating token------------//
    async generateToken(user:User){

        return {
            access_token:await this.generateAccessToken(user),      //calling function
            refresh_Token: await this.generaterefreshToken(user)

        }
    }


    //--------funcytion to genetate refresh token-------//
    async generaterefreshToken(user: { name: string; id: number; email: string; password: string; role: $Enums.UserRole; }):Promise<string> {
        const payload={
            email:user.email,
            sub:user.id,
            role:user.role
        }
        return this.jwtService.sign(payload,{

            secret: 'sdvnseovuownvnsovjs45934truvisnjen9vnj',
            expiresIn:"15m"
               
        })
    }


     //--------funcytion to genetate access token-------//
     async generateAccessToken(user: { name: string; id: number; email: string; password: string; role: $Enums.UserRole; }):Promise<string> {
        const payload={
            sub:user.id,
        }
         return  this.jwtService.sign(payload,{

            secret: 'dsjvkjsjkvnjsjvs87vt8s7t7v',
            expiresIn:"7d"
               
        })
    }


    //--------refresh token-----------//
    async refreshToken(refreshToken:string):Promise<string>{

        const payload= this.jwtService.verify(refreshToken,{
            secret:'sdvnseovuownvnsovjs45934truvisnjen9vnj'
        });

        const user = await this.database.user.findUnique({
            where:{id:payload.sub}
        });

        if(!user){
            throw new NotFoundException("invalid token");
        }

         return this.generateAccessToken(user);
    }



    //--------helper functions------------//

    //----------verifing passwords----------//
   async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
       return await bcrypt.compare(password,hashedPassword);
    }


    //-------------------harshing passwords--------//
    async hashedPassword(password: string):Promise<string> {
        return await bcrypt.hash(password,10);
    }




}
