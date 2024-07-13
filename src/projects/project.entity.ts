import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import{Column_}from'../columns/column_.entity'
import { User } from 'src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Field } from 'src/fields/field.entity';
@Entity()
export class Project {
  @ApiProperty({example:'1', description:'уникальный идентификатор проекта'})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example:'проект', description:'название проекта'})
  @Column()
  name: string;
  @ApiProperty({example:'важный проект', description:'описание проекта'})
  @Column({nullable:true})
  description: string;
  @ApiProperty({example:'2024.01.01:00.00.00', description:'время создания проекта'})
  @CreateDateColumn()
  time_create: string;  
  
  @ManyToOne((type)=>User, (creater)=>creater.id, {cascade:true, onDelete:'CASCADE'})
  creater: User;

  @OneToMany((type)=>Column_, (column)=>column.project)
  columns: Column_[];

  @OneToMany((type)=>Field, (f)=>f.project)
  fields:Field[];
}