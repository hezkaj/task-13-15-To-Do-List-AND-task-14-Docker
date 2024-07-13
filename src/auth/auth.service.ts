import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {

  constructor(private userService:UsersService,
              private jwtService: JwtService){}

  async login(userDto: CreateUserDto){
    const user =await this.validateUser(userDto)
    return this.generateTokens(user);
  }

  async registration(userDto: CreateUserDto){
    const candidate =await this.userService.getUserToAuth(userDto.login);
    if (candidate){
        throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword= await bcrypt.hash(userDto.password, 10);
    const user= await this.userService.createUser({...userDto, password: hashPassword})
    return this.generateTokens(user)
  }

  private async generateTokens(user: User){
    const payload={login: user.login, id: user.id}
    return{
        refresh_token: this.jwtService.sign(payload, {expiresIn:"30d"}),
        access_token: this.jwtService.sign(payload, {expiresIn:60})
    }
  }

  private async validateUser(userDto:CreateUserDto){
    const user=await this.userService.getUserToAuth(userDto.login)
    
    if(user){
      const passwordEquals = await bcrypt.compare(userDto.password, user.password)
      if(passwordEquals)return user;
    }
    throw new UnauthorizedException({message:'Неверный пароль'})
  }
}