import { useEffect, useState } from 'react';


import Input from '../form/Input';
import styles from './ProjectForm.module.css';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ btnText, handleSubmit, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});


    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);
    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }
    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }
    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                text="Nome do projeto"
                name="name"
                placeholder="Digite o nome do projeto"
                handleOnChange={handleChange}
                value={project.name || ''}
            />
            <div>
                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Digite o orçamento do projeto"
                    handleOnChange={handleChange}
                    value={project.budget || ''}
                />
            </div>
            <div>
                <Select
                    text="Selecione a categoria"
                    name="category_id"
                    options={categories}
                    handleOnChange={handleChange}
                    value={project.category ? project.category.id : ''}
                />
            </div>
            <SubmitButton text={btnText} />
        </form>
    );
}
export default ProjectForm;