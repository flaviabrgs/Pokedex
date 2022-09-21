import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './style.css';
import Title from "../assets/title.png";

export default function NavBar() {
 return (
        <div>
     <div className='flex-container'>
     <Navbar expand="lg">
      <Container fluid className='container'>
      <img
           alt="Pokedex"
            src={Title}
            width="300"
            height="160"
            className="d-inline-block align-top"
            />{''}
      </Container>
      
        </Navbar>
        </div>
        </div>
    );
 
}
    


