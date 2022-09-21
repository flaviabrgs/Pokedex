import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './style.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';


export default function PokeCard({name, image, imageback, imageshiny, weight, height, id, type}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
  
    <Container className='content'>
    <Container className='container-fluid'>
    <Col xs={1} md={6} className="g-4">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
        
          <Card className='card1'>
            <Card.Img className = 'imgPoke' variant="top" src={image} onClick={toggle}/>
            <div className='favIcon'>
           
            </div>
            <Card.Body>
              <Card.Title className="titleCard">{name}</Card.Title>
              <Card.Text> 

              <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                <img src={image} className="imgModal"/>
                <img src={imageback} className="imgModal"/>
                <img src={imageshiny} className="imgModal"/>
                <h1>{name}</h1>
                <p>Tipo: {type[0].type.name}</p>
                <p>Id: {id}</p>
                <p>Peso: {weight}</p>
                <p>Altura: {height}</p>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" onClick={toggle}>Done</Button>
                </ModalFooter>
              </Modal>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Col>
    </Container>
    </Container>

  );
}

