import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { Column_ } from './column_.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { FieldsModule } from 'src/fields/fields.module';
import { ValuesModule } from 'src/fieldsValues/values.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Column_]),
    AuthModule,
    forwardRef(()=>ProjectsModule),
    forwardRef(()=>UsersModule),
    forwardRef(()=>TasksModule),
    forwardRef(()=>FieldsModule),
    forwardRef(()=>ValuesModule)
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports:[ColumnsService]
})
export class ColumnsModule {}