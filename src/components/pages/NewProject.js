import ProjectForm from '../project/ProjectForm';
import { useNavigate } from 'react-router-dom';

import styles from './NewProject.module.css';
import { useEffect } from 'react';

// Pagina de Novo Projeto

function NewProject() {

    const navigate = useNavigate();
    function createPost(project) {
        // initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                // redirect
                navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } });
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Welcome to the New Project Page</h1>
            <p>Here you can create a new project.</p>
            <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} />
        </div>
    );
}

export default NewProject;