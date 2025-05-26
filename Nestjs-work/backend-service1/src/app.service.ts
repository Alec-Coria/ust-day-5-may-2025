import { Injectable } from '@nestjs/common';
import { ProjectDTO } from './ProjectDTO';

@Injectable()
export class AppService {
  async createProject(project: ProjectDTO): Promise<any>{
    
  console.log(project);
    const response = await fetch('http://localhost:4000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if(!response.ok) {
      const text = await response.text();
      throw new Error(`Error creating project: ${text}`);
    }

    return response.json();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
