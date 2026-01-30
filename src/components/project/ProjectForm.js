function ProjectForm() {
    return (
        <form>
            <div>
            <input type="text" placeholder="Nome do projeto" />
            </div>
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