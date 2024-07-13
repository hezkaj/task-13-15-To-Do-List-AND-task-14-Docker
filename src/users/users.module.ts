import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(()=>AuthModule),

  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[
    UsersService,
    
  ]
})
export class UsersModule {}