import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserResponseDto } from './dto/user-response.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
          
    constructor(private database:DatabaseService){}

   //--------gets the user by id------//
    async getUserById(id:number):Promise<UserResponseDto>{

        const user=await this.database.user.findUnique({
            where:{id:id}
        });

        if(!user){
            throw new NotFoundException("user not found");
        }

        return UserResponseDto.fromUser(user);
    }


    //------------gets all user using query-------------//
    async getAllUser(name?:string):Promise<UserResponseDto[]>{
        const users =await this.database.user.findMany({
            where:name?{name}:{}
        })
        if(users.length===0){
            throw new NotFoundException("user not found from user name");
        }
        const userDto= users.map((user)=> UserResponseDto.fromUser(user)) ;
        return userDto;
    }


    //-------------updates the user-----//
    async updateUser(updateDto:Prisma.UserUpdateInput,currentUser:User):Promise<UserResponseDto>{

         const updatedUser= await this.database.user.update({
            where:{id:currentUser.id},
            data:updateDto
        })

        if(!updatedUser){

            throw new InternalServerErrorException("updated failed")
        }

        return UserResponseDto.fromUser(updatedUser);

    }

    //---------delete the user---------------//
    async deleteUser(id:number):Promise<string>{
         await this.database.user.delete({
            where:{id:id}
        })

        return "user deleted sucessfully";
    }
}
