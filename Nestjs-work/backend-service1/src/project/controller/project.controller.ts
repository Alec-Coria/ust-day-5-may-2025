import { Query, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ProjectDTO } from 'src/project/dto/ProjectDTO';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async createProject(@Res() response, @Body() createProjectDTO: ProjectDTO) {
        try {
            const newProject = await this.projectService.createProject(createProjectDTO);
            return response.status(HttpStatus.CREATED).json({
                message: 'Project has been created successfully',
                newProject,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Project not created!',
                error: 'Bad Request'
            })
        }
    }

        @Put('/:id')
    async updateProject(@Res() response,
        @Param('id') projectId: string,
        @Body() updateProjectDto: ProjectDTO) {
        try {
            const existingProject = await this.projectService.updateProject(projectId, updateProjectDto);
            return response.status(HttpStatus.OK).json({
                message: 'Project has been successfully updated',
                existingProject,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getProjects(
        // Parametros de URL que paginan la informacion
        @Query('_page') page = 1,
        @Query('_limit') limit = 10,
        @Query('_sort') sort = 'name',
        @Res() response) {
        try {
            const pageNumber = Number(page);
            const limitNumber = Number(limit);

            const projectsData = await this.projectService.getAllProjects(pageNumber, limitNumber, sort);
            return response.status(HttpStatus.OK).json({
                message: 'All projects data found successfully',
                projectsData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getProject(@Res() response, @Param('id') projectId: string) {
        try {
            const existingProject = await this.projectService.getProject(projectId);
            return response.status(HttpStatus.OK).json({
                message: 'Project found successfully',
                existingProject,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') projectId: string) {
        try {
            const deletedProject = await this.projectService.deleteProject(projectId);
            return response.status(HttpStatus.OK).json({
                message: 'Project deleted successfully',
                deletedProject,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }



}

