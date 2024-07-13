import { Body, Controller, Param, Post, UseGuards, UsePipes, Headers, Get, Delete, Put, Patch } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { UsersService } from "src/users/users.service";
import { ProjectsService } from "src/projects/projects.service";
import { ColumnsService } from "src/columns/columns.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidationPipe } from "src/validation/validation.pipe";
import { CreateTaskDto } from "./task.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Task } from "./task.entity";
import { FieldsService } from "src/fields/fields.service";
import { ValuesService } from "src/fieldsValues/values.service";

@ApiTags('действия с задачами')
@Controller('task/:user_id/:project_id/:column_id')
export class TasksController{
    constructor(
        private projectService: ProjectsService,
        private userService: UsersService,
        private taskService: TasksService,
        private columnService: ColumnsService,
        private fieldService:FieldsService,
        private valuesService: ValuesService
    ){}
    @ApiOperation({summary:'Создание задачи'})
    @ApiResponse({status:200, type:Task})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createTask(@Headers() head, @Body() taskDto:CreateTaskDto, @Param() param,
      @Body()value){
        const project = await this.findParent(head,param)
        const column =await this.columnService.getOneColumn(project,param)
        const task = await this.taskService.createTask( taskDto, column,)
        const putField= await this.fieldService.getAllField(project)
        await this.valuesService.createValues(putField, value, task)
        return  task;
    }

    @ApiOperation({summary:'Получение всех задач проекта'})//////
    @ApiResponse({status:200, type:[Task]})
    @UseGuards(JwtAuthGuard)
    @Get('/tasks')
    async getTasksOfColumn(@Headers() head, @Param() param){
        const project = await this.findParent(head,param)
        const column =await this.columnService.getOneColumn(project,param)
        return await this.taskService.getTasksOfColumn(column)
    }
    @ApiOperation({summary:'Получение задачи по айди'})
    @ApiResponse({status:200, type:Task})
    @UseGuards(JwtAuthGuard)
    @Get('/:task_id')
    async getOneTask(@Headers() head, @Param() param){
        const project = await this.findParent(head,param)
        const column =await this.columnService.getOneColumn(project,param)
        return await this.taskService.getOneTask(column, param)
    }
    @ApiOperation({summary:'Удаление задачи по айди'})
    @ApiResponse({status:200, type:Object})
    @UseGuards(JwtAuthGuard)
    @Delete('/:task_id')
    async deleteTask(@Headers() head, @Param() param){
        const project = await this.findParent(head,param)
        const column =await this.columnService.getOneColumn(project,param)
        return await this.taskService.deleteTask(column, param)
    }
    @ApiOperation({summary:'Изменение положения задачи внутри проекта по айди'})//////
    @ApiResponse({status:200, type:Array})
    @UseGuards(JwtAuthGuard)
    @Patch('/:task_id')
    async repozTask(@Headers() head, @Body() body, @Param() param){
        const project = await this.findParent(head,param)
        const column =await this.columnService.getOneColumn(project,param)
        return await this.taskService.repozTask(column,param,body)
    }
    @ApiOperation({summary:'Изменение задачи по айди'})
    @ApiResponse({status:200, type:Task})
    @UseGuards(JwtAuthGuard)
    @Put('/:task_id')
    async updateTask(@Headers() head, @Body() taskDto:CreateTaskDto, @Param() param,
      @Body()value){
        const project = await this.findParent(head,param)
        const column =await this.columnService.getOneColumn(project,param)
        const task= await this.taskService.updateTask(column,param,taskDto)
        const putField= await this.fieldService.getAllField(project)
        await this.valuesService.updateValues(putField, value, task)
        return this.getOneTask(head, param);
    }

    ////вспомогательная функция
    private async findParent(head,param){
        const creater=await this.userService.getOneUser(head)
        return await this.projectService.getOneProject(creater, param)
         
    }
}