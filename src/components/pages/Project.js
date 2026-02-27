import style from './Project.module.css';
import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceFrom';
import ServiceCard from '../service/ServiceCard';

function Project() {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [services, setServices] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setServices(data.services);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 300);
    }, [id]);
    function createService(project) {
        setMessage('');
        //last service
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        //maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('');
            setMessage('Orçamento ultrapassado, verifique o valor do serviço');
            setType('error');
            project.services.pop();
            return false;
        }
        //add service cost to project total cost
        project.cost = newCost;

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
            .then((data) => {
                //exibir os serviços            setProject(data);
                setMessage('Serviço adicionado com sucesso!');
                setType('success');
                setShowServiceForm(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }
    function removeService(id, cost) {
        const servicesUpdated = project.services.filter((service) => service.id !== id);
        const projectUpdated = project;
        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        }).then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated);
                setServices(servicesUpdated);
                setMessage('Serviço removido com sucesso!');
                setType('success');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function editPost(project) {
        setMessage('');
        //Budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que os custos do projeto!');
            setType('error');
            return false;
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto atualizado com sucesso!');
                setType('success');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return <>{project.name ? (
        <div className={style.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div className={style.details_container}>
                    <h1>Projeto: {project.name}</h1>

                    <button onClick={toggleProjectForm} className={style.btn}>
                        {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                    </button>
                    {!showProjectForm ? (
                        <div className={style.project_info}>
                            <p><span>Categoria:</span> {project.category.name}</p>
                            <p><span>Total de orçamento:</span> R${project.budget}</p>
                            {/*Verificar se há custos registrados*/}
                            {project.cost > 0 ? (
                                <p><span>Total utilizado:</span> R${project.cost}</p>
                            ) : (<p><span>Total utilizado:</span> R$0</p>)}
                            {/*Verificar se o orçamento estourou*/}
                            {project.budget - project.cost == 0 ? (
                                <p className={style.danger}>Chegou no limite!</p>
                            ) : (<p className={style.success}>Orçamento dentro do limite</p>)}
                        </div>
                    ) : (
                        <div className={style.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText="Editar projeto" projectData={project} />
                        </div>
                    )}
                </div>
                <div className={style.service_form_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={style.btn} onClick={toggleServiceForm}>{showServiceForm ? 'Fechar' : 'Adicionar serviço'}</button>
                    <div className={style.project_info}>
                        {showServiceForm && (<ServiceForm
                            handleSubmit={createService}
                            btnText='Adicionar serviço'
                            projectData={project} />)}
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                    {services.length > 0 && services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            handleRemove={removeService}
                        />
                    ))}
                    {services.length === 0 && <p>Não á serviços cadastrados</p>}
                </Container>
            </Container>
        </div>
    ) : (
        <Loading />
    )}</>
}
export default Project;