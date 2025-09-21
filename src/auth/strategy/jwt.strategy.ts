import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

//auto verifying of jwt

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
   constructor(private authService:AuthService){
    super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration:false,
          secretOrKey:'dsjvkjsjkvnjsjvs87vt8s7t7v',
    });
   }


   async validate(payload: any) {
    try {
        const user = await this.authService.getUserById(payload.sub);

        return {
            ...user,role: payload.role        //from here we are sending the user to req body by auth guard
        }
    } catch (error) {
        throw new UnauthorizedException("invalid")
    }
   }

}