import { Body, Controller, Delete, Get, Headers, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import { FieldsService } from "./fields.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectsService } from "src/projects/projects.service";
import { UsersService } from "src/users/users.service";
import { Field } from "./field.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidationPipe } from "src/validation/validation.pipe";
import { CreateFieldDto } from "./field.dto";

@ApiTags('действия с полями задач')
@Controller('field/:user_id/:project_id')
export class FieldsController{
    constructor(
        private fieldService:FieldsService,
        private projectService:ProjectsService,
        private userService: UsersService
        
    ){}
    @ApiOperation({summary:'Создание поля задач'})
    @ApiResponse({status:200, type:Field})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createField(@Headers() head, @Body() fieldDto:CreateFieldDto, @Param() param){
        const user = await this.userService.getOneUser(head)
        const project= await this.projectService.getOneProject(user,param)
        return await this.fieldService.fieldCreate(project,fieldDto)
    }
    @ApiOperation({summary:'Получение полей задач проекта'})
    @ApiResponse({status:200, type:Field})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAllFields(@Headers() head, @Param() param){
        const user = await this.userService.getOneUser(head)
        const project= await this.projectService.getOneProject(user,param)
        return await this.fieldService.getAllField(project)
    }
    @ApiOperation({summary:'Удаление поля задач по фйди'})
    @ApiResponse({status:200, type:Object})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Delete('/:field_id')
    async deleteField(@Headers() head, @Param() param){
        const user = await this.userService.getOneUser(head)
        const project= await this.projectService.getOneProject(user,param)
        return await this.fieldService.deleteField(project, param )
    }

}//