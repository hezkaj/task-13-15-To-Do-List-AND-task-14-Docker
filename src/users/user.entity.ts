import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Project } from 'src/projects/project.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @ApiProperty({example:'1', description:'уникальный идентификатор пользователя'})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example:'user01', description:'логин пользователя'})
  @Column({unique:true})
  login: string;
  @ApiProperty({example:'User.001', description:'пароль пользователя'})
  @Column()
  password: string;

  @OneToMany((type)=>Project, (project)=>project.creater)
  @JoinColumn()
  projects:Project[]
}