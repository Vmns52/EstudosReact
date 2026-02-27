import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// Importação das páginas
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

// Importação dos componentes de layout
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      {/* Navegação da aplicação - Links para as páginas */}
      <Navbar />
      
      {/* Define as rotas da aplicação - Switch agora é Routes */}
      <Container customClass="min-height">
      <Routes>
        
          <Route exact path='/' element={<Home/>} />
          <Route path='/projects' element={<Projects/>} />
           <Route path='/company' element={<Company/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/newproject' element={<NewProject/>} />
          <Route path='/project/:id' element={<Project/>} />
        
      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
