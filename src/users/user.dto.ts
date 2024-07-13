import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsStrongPassword, Length, } from 'class-validator';

class CreateUserDto {
  @ApiProperty({example:'user01', description:'Введите логин для пользователя'})
  @IsString({message:'Логин должен быть строкой'})
  @Length(6,20, {message:'Логин должен содержать не менее 6 и не более 20 символов'})
  login: string;
  @ApiProperty({example:'User.001', description:'Введите пароль для пользователя'})
  @IsStrongPassword({},{message:`Пароль должен содержать не меньше 8 символов, включая заглавные и строчные буквы, цифры и символы`})
  password: string;

 
}



export{CreateUserDto,}