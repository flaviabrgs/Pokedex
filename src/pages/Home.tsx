import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import PokeCard from '../components/pokeCard';
import { Container, Form, Navbar } from 'react-bootstrap';
import '../components/style.css';
import { Input } from "reactstrap";
import { PokeDetails } from "../components/interface";

export interface Pokemons {
    name: string;
    url: string;
}

const Home: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokeDetails[]>([]);
    const [error, setError ] = useState(null);
    const [result, setResult] = useState<string>("");
    
    useEffect(() => {
         const pokemonData = async () =>{
         const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0")

         res.data.results.forEach(async (pokemon: Pokemons) => {
            const resultPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            setPokemons(p =>{return p = [...p, resultPoke.data];})
         })
        }
        pokemonData();
    }, [result])

    
    useEffect(() => {
        const results = pokemons.filter((res) =>res.name.toLowerCase().includes(result.toLowerCase())); 
        setPokemons(results);
    }, [result])
    

    const handlePress = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setResult(e.target.value);
    };

   
    if (error) {
        return <div className='container'>Carregando...</div>
    } 

    return(
        <div>
        <Navbar/>
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
                <div className ="container1" >
                {/* TODO: esse componente ele renderiza uma lista entao muda o nome pra que essa ideia fique clara! PokeList etc sei la */}
                <PokeCard pokemons={pokemons}/>
                </div>
        </Container>
        </div>
        
    )
    
    
}

export default Home;
