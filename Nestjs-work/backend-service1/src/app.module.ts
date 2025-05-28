import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './project/controller/project.controller';
import { ProjectService } from './project/service/project.service';
import { ProjectSchema } from './schema/project.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'projectsdb'}),
  MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])],
  controllers: [AppController, ProjectController],
  providers: [AppService, ProjectService],
})
export class AppModule {}
