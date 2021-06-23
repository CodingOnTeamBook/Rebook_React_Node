import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from './users.model';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
//import { AuthService } from "src/auth/auth.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  //forFeature() method to define which models are registered in the current scope.
  imports: [SequelizeModule.forFeature([User]), AuthModule], 
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}