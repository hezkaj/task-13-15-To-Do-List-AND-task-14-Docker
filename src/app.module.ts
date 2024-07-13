import {Module} from '@nestjs/common';
import env = require('../env_config') ;
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Column_ } from './columns/column_.entity';
import { Task } from './tasks/task.entity';
import { Project } from './projects/project.entity';
import{UsersModule} from './users/users.module'
import{ProjectsModule} from './projects/projects.module'
import{TasksModule} from './tasks/tasks.module'
import{ColumnsModule} from './columns/columns.module'
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.module';
import { Field } from './fields/field.entity';
import { numberValue } from './fieldsValues/numberValue.entity';
import { stringValue } from './fieldsValues/stringValue.entity';
import { ValuesModule } from './fieldsValues/values.module';
import { enumValue } from './fieldsValues/enumValue.entity';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: env.DATA_HOST,
            port: env.DATA_PORT,
            username: env.DATA_USER,
            password: env.DATA_PASSWORD,
            database: env.DATA_NAME,
            entities: [
                User,
                Column_,
                Task,
                Project,
                Field,
                numberValue,
                stringValue,
                enumValue
            ],
            synchronize:true,
            autoLoadEntities:true
        }),
        UsersModule,
        ProjectsModule,
        TasksModule,
        ColumnsModule,
        AuthModule,
        FieldsModule,
        ValuesModule
    ]
})
export class AppModule{}