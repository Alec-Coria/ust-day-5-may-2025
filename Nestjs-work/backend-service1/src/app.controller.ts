import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectDTO } from './ProjectDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() projectDTO: ProjectDTO) {
    const savedProject = await this.appService.createProject(projectDTO);
    return savedProject;
  }

}
