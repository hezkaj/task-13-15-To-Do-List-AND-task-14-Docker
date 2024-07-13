import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  
  ) {}
  async createProject(user:User, projectDto:CreateProjectDto):Promise<Project>{
    return await this.projectsRepository.save({...projectDto, creater:user});
  }
  async getAllProjects(creater:User){
    return await this.projectsRepository.find({
      where:{creater:creater},
      relations:{
        columns:{
          tasks:{string_values:{field:true}, 
          number_values:{field:true},
          enum_values:{field:true},}} ,
        creater:true
      }
    });
  }
  async getOneProject(creater:User, param){
    const proj = await this.projectsRepository.findOne({
      where:{creater:creater, id:param.project_id},
      relations:{
        columns:{
          tasks:{string_values:{field:true}, 
          number_values:{field:true},
          enum_values:{field:true},}} ,
        creater:true
      }
    });
    if (proj)return proj;
    throw new NotFoundException({message:'Проект не найден'});
  }
  async deleteProject(creater:User, param){
    const project=await this.getOneProject(creater,param)
    await this.projectsRepository.remove(project);
    //return await this.projectsRepository.find({where:{creater:creater}});
    return {messge:'Проект удален'}
    
  }
  async updateProject(creater:User,param, projectDto){
    await this.getOneProject(creater,param)
    await this.projectsRepository.update(param.project_id,{...projectDto})
    return await this.projectsRepository.findOne({where:{id:param.project_id}})
  }

}