import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "src/users/user.dto";
import { AuthService } from "./auth.service";
import { ValidationPipe } from "../validation/validation.pipe";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('действия с пользователями')
@Controller('auth')
export class AuthController{
    constructor(
        private authService: AuthService
    ){}
    @ApiOperation({summary:'Регистрация пользователя'})
    @ApiResponse({status:200, type:Object})
    @UsePipes(ValidationPipe)
    @Post('/registr')
    async registrUser(@Body() userDto: CreateUserDto){
        return await this.authService.registration(userDto);
        
    }
    @ApiOperation({summary:'Авторизация пользователя'})
    @ApiResponse({status:200, type:Object})
    @Post('/login')
    async loginUser(@Body() userDto: CreateUserDto){
        return await this.authService.login(userDto);
    }

   
}