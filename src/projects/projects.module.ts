import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { FieldsModule } from 'src/fields/fields.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    AuthModule,
    forwardRef(()=>UsersModule),
    forwardRef(()=>ColumnsModule),
    forwardRef(()=>TasksModule),
    forwardRef(()=>FieldsModule)
  ],
  providers: [ProjectsService, ],
  controllers: [ProjectsController],
  exports:[
    ProjectsService
  ]
})
export class ProjectsModule {}