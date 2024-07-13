import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { ColumnsModule } from 'src/columns/columns.module';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { AuthModule } from 'src/auth/auth.module';
import { ValuesModule } from 'src/fieldsValues/values.module';
import { FieldsModule } from 'src/fields/fields.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule,
    forwardRef(()=>ProjectsModule),
    forwardRef(()=>UsersModule),
    forwardRef(()=>ColumnsModule),
    forwardRef(()=>ValuesModule),
    forwardRef(()=>FieldsModule),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports:[TasksService]
})
export class TasksModule {}