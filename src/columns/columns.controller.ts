import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { ColumnsService } from "./columns.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProjectsService } from "src/projects/projects.service";
import { UsersService } from "src/users/users.service";
import { CreateColumnDto } from "./column_.dto";
import { ValidationPipe } from "src/validation/validation.pipe";
import { Column_ } from "./column_.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags('действия с столбцами')
@Controller('column/:user_id/:project_id')
export class ColumnsController{
    constructor(
        private columnService:ColumnsService,
        private projectService: ProjectsService,
        private userService: UsersService,
        
    ){}
    @ApiOperation({summary:'Создание столбца'})
    @ApiResponse({status:200, type:Column_})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createColumn(@Headers() head, @Body() columnDto:CreateColumnDto, @Param() param){
        const project = await this.findParent(head, param)
        return await this.columnService.createColumn(project, columnDto)
    }
    @ApiOperation({summary:'Получениие всех столбцов проекта'})
    @ApiResponse({status:200, type:[Column_]})
    @UseGuards(JwtAuthGuard)
    @Get('/columns')
    async getAllColumns(@Headers() head, @Param() param){
        const project = await this.findParent(head, param)
        return await this.columnService.getAllColumns(project)
    }
    @ApiOperation({summary:'Получениие столбца по айди'})
    @ApiResponse({status:200, type:Column_})
    @UseGuards(JwtAuthGuard)
    @Get('/:column_id')
    async getOneColumn(@Headers() head, @Param() param){
        const project = await this.findParent(head, param)
        return await this.columnService.getOneColumn(project, param)
    }
    @ApiOperation({summary:'Удаление столбца по айди'})
    @ApiResponse({status:200, type:Object})
    @UseGuards(JwtAuthGuard)
    @Delete('/:column_id')
    async deleteColumn(@Headers() head, @Param() param){
        const project = await this.findParent(head, param)
        return await this.columnService.deleteColumn(project, param)
    }
    @ApiOperation({summary:'Изменение положения столбца внутри проекта по айди'})
    @ApiResponse({status:200, type:[Column_]})
    @UseGuards(JwtAuthGuard)
    @Patch('/:column_id')
    async repozColumn(@Headers() head, @Body() body, @Param() param){
        const project = await this.findParent(head, param)
        return await this.columnService.repozColumn(project,param,body.pozition)
    }
    @ApiOperation({summary:'Редактирование стобца по айди'})
    @ApiResponse({status:200, type:Column_})
    @UseGuards(JwtAuthGuard)
    @Put('/:column_id')
    async updateColumn(@Headers() head, @Body() columnDto:CreateColumnDto, @Param() param){
        const project = await this.findParent(head, param)
        return await this.columnService.updateColumn(project,param,columnDto)
    }
////вспомогательная функция
    async findParent(head, param){
        const creater=await this.userService.getOneUser(head)
        return await this.projectService.getOneProject(creater, param)
    }
}