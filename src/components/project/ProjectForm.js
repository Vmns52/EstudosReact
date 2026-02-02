import Input from '../form/Input';
import styles from './ProjectForm.module.css';


function ProjectForm() {
    return (
        <form className={styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Digite o nome do projeto"
            />
            <div>
            <input type="number" placeholder="Orçamento do projeto" />
            </div>
            <div>
            <select name="category_id">
                <option disabled selected value="">Selecione uma categoria</option>
                <option value="design">Design</option>
            </select>
            </div>
            <button type="submit">Criar Projeto</button>
        </form>
    );                                                          
}
export default ProjectForm;