import {  Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { CreateProjectDto } from "./project.dto";
import { ProjectsService } from "./projects.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import { ValidationPipe } from "src/validation/validation.pipe";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Project } from "./project.entity";

@ApiTags('действия с проектами')
@Controller('project/:user_id')
export class ProjectsController{
    constructor(
        private projectService: ProjectsService,
        private userService: UsersService,

    ){}
    @ApiOperation({summary:'Создание проекта'})
    @ApiResponse({status:200, type:Project})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createProject(@Headers() head, @Body() projectDto:CreateProjectDto){
        const creater=await this.userService.getOneUser(head)
        return await this.projectService.createProject(creater, projectDto)
    }
    @ApiOperation({summary:'Получение всех проектов пользователя'})
    @ApiResponse({status:200, type:[Project]})
    @UseGuards(JwtAuthGuard)
    @Get('/projects')
    async getAllProjects(@Headers() head){
        const creater=await this.userService.getOneUser(head)
        return await this.projectService.getAllProjects(creater)
    }
    @ApiOperation({summary:'Получение проекта по айди'})
    @ApiResponse({status:200, type:Project})
    @UseGuards(JwtAuthGuard)
    @Get('/:project_id')
    async getOneProject(@Headers() head, @Param() param){
        const creater=await this.userService.getOneUser(head)
        return await this.projectService.getOneProject(creater, param)
    }
    @ApiOperation({summary:'Удаление проекта по айди'})
    @ApiResponse({status:200, type:Object})
    @UseGuards(JwtAuthGuard)
    @Delete('/:project_id')
    async deleteProject(@Headers() head, @Param() param){
        const creater=await this.userService.getOneUser(head)
        return await this.projectService.deleteProject(creater, param)
    }
    @ApiOperation({summary:'Редактирование проекта по айди'})
    @ApiResponse({status:200, type:Project})
    @UseGuards(JwtAuthGuard)
    @Put('/:project_id')
    async updateProject(@Headers() head, @Param() param, @Body() projectDto:CreateProjectDto){
        const creater=await this.userService.getOneUser(head)
        return await this.projectService.updateProject(creater,param, projectDto)
    }
    
}