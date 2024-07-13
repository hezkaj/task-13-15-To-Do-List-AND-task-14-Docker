import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async createUser(userDto:CreateUserDto){
    return await this.usersRepository.save(userDto)
  }
  async getUserToAuth(login:string){
    return await this.usersRepository.findOne({where:{login:login}})
  }
  async getOneUser(head){
    const authHeader = head.authorization;
    const token=authHeader.split(' ')[1];
    const user= this.jwtService.verify(token);//user
    if(user){
      const u= await this.usersRepository.findOne({where:{login:user.login}});
      if(u)return u;
    }
    throw new BadRequestException({message:'Пользователь не найден'})
  }
  async deleteUser(head){
    const user=await this.getOneUser(head)
    await this.usersRepository.remove(user)
    //return await this.usersRepository.find()
    return {message:'Пользователь удален'}
  }
///////////////////////////////////////////////////////////////////////////
  async getAllUsers(){
    return await this.usersRepository.find()
  }
}