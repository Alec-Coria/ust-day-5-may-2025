import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { IProject } from '../interface/project.interface';
import { Model } from "mongoose";
import { ProjectDTO } from '../dto/ProjectDTO';

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private projectModel: Model<IProject>) { }

    async createProject(createProjectDTO: ProjectDTO): Promise<IProject> {
        const newProject = await new this.projectModel(createProjectDTO);
        return newProject.save();
    }

    async updateProject(projectId: string, updateProjectDTO: ProjectDTO): Promise<IProject> {
        const existingProject = await this.projectModel.findByIdAndUpdate(projectId, updateProjectDTO, { new: true });
        if(!existingProject) {
            throw new NotFoundException(`Project #${projectId} not found`);
        }
        return existingProject;
    }

    // trae todos los proyectos por paginacion
    async getAllProjects(
        page: number,
        limit: number,
        sort: string,
    ): Promise<IProject[]> {
        const skip = (page - 1) * limit; // calcula cuantos documnetos saltar para la paginacion

        const projectData = await this.projectModel
            .find()
            .sort({ [sort]: 1 }) //ordenar ascendente por el campo sort
            .skip(skip)
            .limit(limit);
        if (!projectData || projectData.length === 0) {
            throw new NotFoundException('Projects data not found!');
        }
        return projectData;
    }

    async getProject(projectId: string): Promise<IProject> {
        const existingProject = await this.projectModel.findById(projectId).exec();
        if(!existingProject) {
            throw new NotFoundException(`Project #${projectId} not found`);
        }
        return existingProject;
    }

    async deleteProject(projectId: string): Promise<IProject> {
        const deletedProject = await this.projectModel.findByIdAndDelete(projectId);
        if (!deletedProject) {
            throw new NotFoundException(`Project #${projectId} not found`);
        }
        return deletedProject;
    }
}
