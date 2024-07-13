import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service"
import { JwtModule } from "@nestjs/jwt";
import env = require('../../env_config') ;
import { UsersModule } from "src/users/users.module";

@Module({
    controllers:[AuthController],
    providers:[AuthService],
    imports:[
        forwardRef(()=>UsersModule),
        JwtModule.register({
            secret: env.SECRET,
            
        })
    
    ],
    exports:[
        AuthService, 
        JwtModule
    ]
})
export class AuthModule{}