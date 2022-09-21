import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/navBar';
import PokeCard from '../components/pokeCard';
import { Container, CardGroup, Form, Button } from 'react-bootstrap';
import '../components/style.css';
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { Input } from "reactstrap";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError ] = useState(null);
    const [result, setResult] = useState("");
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        pokemonData(); 
    }, [])

    const pokemonData = async () => {
        var toArray= [];
        try{
        for (let i = 1; i <= 504; i++){
            toArray.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        let res = await axios.all(toArray.map((pokemons) => axios
        .get(pokemons))) 
        .then((res) => setPokemons(res));
        setError(null)
        return res;
        } catch (error){
         setError(error.message)
        }  
    }
    
    const addToFavorite = (id) => {
        if (!favorite.includes(id)) 
        setFavorite(favorite.concat(id));
    };

    const removeFavorite = id => {
        let index = favorite.indexOf(id);
        let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
        setFavorite(temp);
    };

    let findfavorite = pokemons.filter(pokemon => favorite.includes(pokemon.data.name));

    useEffect(() => {
        const results = pokemons.filter((res) =>res.data.name.toLowerCase().includes(result.toLowerCase())); 
        setPokemons(results);
        if(results === ""){
            pokemonData();
        }
        
    }, [result])
    

    const handlePress = (e) => {
        setResult(e.target.value);
    };

    if (error) {
        return <div className='container'>Carregando...</div>
    } 

    return(
        <div key = {pokemons.id}>
        <NavBar/>
        <Container fluid className="container-2">  
        <Form>
        <Input
         type="search"
         placeholder="Pesquise o pokémon"
         className="me-2"
         aria-label="Search"
         value={result}
         onChange={handlePress}
        />
        </Form>
        <h1>Pokémons</h1>
            <CardGroup>            
            {pokemons.map((pokemon, key)=> (
                <div key={key} className ="container1">
                <PokeCard pokemons={pokemon.data}name={pokemon.data.name} image={pokemon.data.sprites.front_default} height ={pokemon.data.height} 
                weight={pokemon.data.weight} id={pokemon.data.id} imageback={pokemon.data.sprites.back_default} 
                imageshiny = {pokemon.data.sprites.front_shiny} type = {pokemon.data.types}/>
                <Button variant='danger' className="buttonFav" onClick={() => addToFavorite(pokemon.data.name)}>
                Add to favorite <BsHeartFill/>
                </Button>
                </div>
            ))}
             </CardGroup>  

             <div className="favorites">
                    {findfavorite.map(pokemon => {
                        return (
                            <div key={pokemon.id} >
                                <div className="card2">
                                <h3>Favoritado</h3>
                                <h2>{pokemon.data.name}</h2>
                                <img className = "favCard" src={pokemon.data.sprites.front_default}/>
                                <Button variant='danger' className="buttonFav" onClick={() => removeFavorite(pokemon.data.name)}>
                                    Remove favorite <BsHeart/>
                                </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
               
        </Container>       
        </div>
        
    )
    
    
}

export default Home;

