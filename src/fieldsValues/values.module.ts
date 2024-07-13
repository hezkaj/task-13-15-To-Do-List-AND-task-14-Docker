import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { numberValue } from "./numberValue.entity";
import { stringValue } from "./stringValue.entity";
import { FieldsModule } from "src/fields/fields.module";
import { UsersModule } from "src/users/users.module";
import { ProjectsModule } from "src/projects/projects.module";
import { AuthModule } from "src/auth/auth.module";
import { ValuesService } from "./values.service";
import { ValuesController } from "./values.controller";
import { TasksModule } from "src/tasks/tasks.module";
import { ColumnsModule } from "src/columns/columns.module";
import { enumValue } from "./enumValue.entity";

@Module({
    imports: [
      TypeOrmModule.forFeature([numberValue]),
      TypeOrmModule.forFeature([stringValue]),
      TypeOrmModule.forFeature([enumValue]),
      AuthModule,
      forwardRef(()=>ProjectsModule),
      forwardRef(()=>UsersModule),
      forwardRef(()=>FieldsModule),
      forwardRef(()=>TasksModule),
      forwardRef(()=>ColumnsModule),
    ],
    providers: [ValuesService],
    controllers: [ValuesController],
    exports:[ValuesService]
  })
  export class ValuesModule {}