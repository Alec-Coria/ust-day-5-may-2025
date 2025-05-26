import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Project } from './Project';
import { useSaveProject } from './projectHooks';

interface ProjectFormProps{
  project: Project;
  onCancel?: () => void;
  isNew?: boolean;
}

function ProjectForm({
  onCancel, 
  project: initialProject,
  isNew }: ProjectFormProps) {
  //Arreglo de las imagenes de assets para seleccionarlas al azar al momento de crear nuevo proyecto
  const images = [
    '/assets/placeimg_500_300_arch1.jpg',
    '/assets/placeimg_500_300_arch2.jpg',
    '/assets/placeimg_500_300_arch3.jpg',
    '/assets/placeimg_500_300_arch4.jpg',
    '/assets/placeimg_500_300_arch5.jpg',
  ]

  //Manejo de project en state(Hook), a traves de props dentro del form
  const [project, setProject] = useState(initialProject);

  //Manejo de errores con hooks
  const [errors, setErrors] = useState({
    name:'',
    description:'',
    budget:''
  });

  const { mutate: saveProject, isPending } = useSaveProject();

  const handleSubmit = (event: SyntheticEvent) => {
    //previene que el navegador se recargue (evita operaciones por defecto)
    event.preventDefault();
    //save del proyecto actualizado alojado en state (hook)
    if(!isValid()) return;
    if(isNew) {
      //selecciona una imagen al azar de assets y la pone en el proyecto que se esta creando
      const projectWithRandomImage = new Project ({ ...project, imageUrl: getRandomImage() });
      saveProject(projectWithRandomImage);
    } else {
      saveProject(project);
    }
  };

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  //funcion para validar inputs
  function validate(project: Project) {
    let errors: any = { name: '', description: '', budget: ''};

    //Validar name
    if (project.name.trim().length === 0) {
      errors.name = 'Name is required';
    } else {
      if(project.name.length >= 100) {
        errors.name = 'Name must to be less than 100 characters';
      }
      if (project.name.length > 0 && project.name.length < 3) {
        errors.name = 'Name needs to be at least 3 characters.';
      }
      if(project.name !== project.name.trim()) {
        errors.name = 'Name cannot have leading or trailing spaces';
      }
    }

    //Validar descripcion
    if(project.description.trim().length === 0) {
      errors.description = 'Description is required.'
    } else {
      if(project.description.length >= 2000) {
        errors.description = 'Description must to be less than 2000 characters';
      }
      if(project.description !== project.description.trim()) {
        errors.description = 'Description cannot have leading or trailing spaces';
      }
    }

    //Validar budget
    if(project.budget === 0) {
      errors.budget = 'Budget must be more than $0.';
    }
    return errors;
  }

  //funcion para validar si hay algo escrito
  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  //Manejo de handle change, cambio de valores en state por proyecto
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === 'checkbox' ? checked : value;

    //if input type is number convert the updatedValue string to a number
    if(type === 'number') {
      if(updatedValue === 0){
        updatedValue = '';
        updatedValue = Number(updatedValue);
      }
      else {
        updatedValue = Number(updatedValue);
      }
    }
    const change = {
      [name]: updatedValue
    }
    let editingProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited like project.id
    // the spread operator (...) is used to spread the previous project properties and the new change
    // Cambio en el state(Hook) del project guardado en state (p), solamente guarda el cambio en el valor que cambio (change)
    // manteniendo los valores del proyecto anterior (sigue siendo p)
    setProject((p) => {
      editingProject = new Project({ ...p, ...change});
      return editingProject;
    })
    //validacion de inputs
    setErrors(() => validate(editingProject));
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
        {isPending && <span className="toast">Saving...</span>}
        <label htmlFor="name">Project Name</label>
        <input 
          type="text" 
          name="name" 
          placeholder="enter name"
          value={project.name}
          onChange={handleChange}
        />
        {errors.name.length > 0 && (
          <div className="card error">
            <p>{errors.name}</p>
          </div>
        )}
        <label htmlFor="description">Project Description</label>
        <textarea 
          name="description"
          placeholder="enter description"
          value={project.description}
          onChange={handleChange}
        />
        {errors.description.length > 0 && (
          <div className="card error">
            <p>{errors.description}</p>
          </div>
        )}
        <label htmlFor="budget">Project Budget</label>
        <input 
          type="number" 
          name="budget" 
          placeholder="enter budget"
          value={project.budget}
          onChange={handleChange}
        />
        {errors.budget.length > 0 && (
          <div className="card error">
            <p>{errors.budget}</p>
          </div>
        )}
        <label htmlFor="isActive">Active?</label>
        <input 
          type="checkbox" 
          name="isActive" 
          checked={project.isActive}
          onChange={handleChange}
        />
        <div className="input-group">
          {/* Al estar dentro de un form, cualquier boton al que no se le especifice "type" sera por defecto "submit"*/}
          {/* Es decir, si se le da clic al boton, se enviara el formulario (inferido por HTML)*/}
            <button className="primary bordered medium">
              {isNew ? 'Create' : 'Save'}
            </button>
            <span />
            {!isNew && (
              <button type="button" className="bordered medium" onClick={onCancel}>
                  cancel
              </button>
            )}
        </div>
    </form>
  );
}

export default ProjectForm;