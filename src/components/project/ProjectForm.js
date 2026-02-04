import { useEffect, useState } from 'react';


import Input from '../form/Input';
import styles from './ProjectForm.module.css';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ btnText }) {
    const [categories, setCategories] = useState([]);

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

    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Digite o nome do projeto"
            />
            <div>
                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Digite o orçamento do projeto"
                />
            </div>
            <div>
                <Select
                    text="Selecione a categoria"
                    name="category_id"
                    options={categories}
                />
            </div>
            <SubmitButton text={btnText} />
        </form>
    );
}
export default ProjectForm;