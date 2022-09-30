import * as React from 'react';
import { CardGroup, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './style.css';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import { PokeDetails } from './interface';
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

interface Props {
  pokemons: PokeDetails[];
}

const PokeCard: React.FC<Props> = (props) => {
  const [modal, setModal] = useState(false);
  const [favorite, setFavorite] = useState<PokeDetails[]>([]);
  const { pokemons } = props;

  const toggle = () => setModal(!modal);

  const addToFavorite = (id) => {
    if (!favorite.includes(id))
      setFavorite(favorite.concat(id));
  };

  const removeFavorite = id => {
    let index = favorite.indexOf(id);
    let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    setFavorite(temp);
  };

  let findfavorite = pokemons.filter(pokemon => favorite.includes(pokemon.name));

  // TODO: Instalar prettier! ou tslint.
  return (
    <>
      <Container className='content'>
        {pokemons.map((pokemon, key) => {
          return (
            <Container className='container-fluid' key={key}>
              <Col xs={1} md={4} className="g-4" >
                <Card className='card1'>
                  <CardGroup>
                    <Card.Img className='imgPoke' variant="top" src={pokemon.sprites.front_default} onClick={toggle} />
                    <Card.Body>
                      <Card.Title className="titleCard" >{pokemon.id}</Card.Title>
                      <Card.Text>
                        <Button variant='danger' className="buttonFav" onClick={() => addToFavorite(pokemon.name)}>
                          Add to favorite <BsHeartFill />
                        </Button>

                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalBody>
                            {/* TODO: adicionar alt prop */}
                            <img src={pokemon.sprites.front_default} className="imgModal" />
                            <img src={pokemon.sprites.back_default} className="imgModal" />
                            <img src={pokemon.sprites.front_shiny} className="imgModal" />
                            <h1>{pokemon.name}</h1>
                            <p>Tipo: {pokemon.types[0].type.name}</p>
                            <p>Id: {pokemon.id}</p>
                            <p>Peso: {pokemon.weight}</p>
                            <p>Altura: {pokemon.height}</p>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={toggle}>Done</Button>
                          </ModalFooter>
                        </Modal>

                      </Card.Text>
                    </Card.Body>
                  </CardGroup>
                </Card>
              </Col>
            </Container>
          );
        })}
      </Container>
      <Container>
        <div className="favorites">
          {findfavorite.map(pokemon => {
            return (
              <div className="card2" key={pokemon.id}>
                <h3>Favoritado</h3>
                <h2>{pokemon.name}</h2>
                {/* TODO: adicionar alt prop */}
                <img className="favCard" src={pokemon.sprites.front_default} />
                <Button variant='danger' className="buttonFav" onClick={() => removeFavorite(pokemon.name)}>
                  Remove favorite <BsHeart />
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default PokeCard;

