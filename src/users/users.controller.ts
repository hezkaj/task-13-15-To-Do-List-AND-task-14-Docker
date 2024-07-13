import { Controller, Delete, Get, Headers,  UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('действия с пользователями')
@Controller('/user')
export class UsersController{
    constructor(
        private userService:UsersService
    ){}
//////////////////////////////////////////////////////////////////
  @Get('/users')
    async getAllUsers(){
        return await this.userService.getAllUsers()
    }
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getOneUser(@Headers() head){
        return await this.userService.getOneUser(head)
    }
////////////////////////////////////////////////////////////////
    @ApiOperation({summary:'Удаление пользователя'})
    @ApiResponse({status:200, type:Object})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteUser(@Headers() head){
        return await this.userService.deleteUser(head)
    }
}