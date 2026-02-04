import ProjectForm from '../project/ProjectForm';


import styles from './NewProject.module.css';

// Pagina de Novo Projeto

function NewProject() {
    return (
        <div className={styles.newproject_container}>
            <h1>Welcome to the New Project Page</h1>
            <p>Here you can create a new project.</p>
            <ProjectForm btnText="Criar Projeto"/>
        </div>
    );
}

export default NewProject;