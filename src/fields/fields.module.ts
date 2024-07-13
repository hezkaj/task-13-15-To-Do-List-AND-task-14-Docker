import { Module, forwardRef } from "@nestjs/common";
import { Field } from "./field.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsModule } from "src/projects/projects.module";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { FieldsService } from "./fields.service";
import { FieldsController } from "./fields.controller";
import { ValuesModule } from "src/fieldsValues/values.module";
import { TasksModule } from "src/tasks/tasks.module";
import { ColumnsModule } from "src/columns/columns.module";

@Module({
    imports: [
      TypeOrmModule.forFeature([Field]),
      AuthModule,
      forwardRef(()=>ProjectsModule),
      forwardRef(()=>UsersModule),
      forwardRef(()=>ValuesModule),
      forwardRef(()=>TasksModule),
      forwardRef(()=>ColumnsModule),
    ],
    providers: [FieldsService],
    controllers: [FieldsController],
    exports:[FieldsService]
  })
  export class FieldsModule {}