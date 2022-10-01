import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import PokeCard from '../components/pokeCard';
import { Container, Form} from 'react-bootstrap';
import '../components/style.css';
import { Input } from "reactstrap";
import { PokeDetails } from "../components/interface";
import Bar from "../components/navBar";


const Home: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokeDetails[]>([]);
    const [allPokemons, setAllPokemons] = useState<PokeDetails[]>([]);
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        pokemonData()
    }, [])


    const pokemonData: VoidFunction = async () => {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=204&offset=0")
        const pokemonsPromise: Promise<any>[] = res.data.results.map(async (pokemon: PokeDetails) => {
            const resPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            return resPoke.data;
        });
        const pokemons = await Promise.all(pokemonsPromise)

        pokemons.sort((a, b) => a.id - b.id)

        setAllPokemons(pokemons);
        setPokemons(pokemons)
    }

    useEffect(() => {
        const resultTrim = result.trim().toLowerCase();
        if (resultTrim.length > 0) {
            const results = allPokemons.filter((res) => {
                return res.name.toLowerCase().includes(resultTrim) ||
                res.types.some((type)=>type.type.name.toLowerCase().includes(resultTrim))
            });

            setPokemons(results);
        } else {
            setPokemons(allPokemons);
        }
    }, [result])


    const handlePress = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setResult(e.target.value);
    };


    return (
        <div>
         <Bar/>
            <Container fluid className="container-2">
                <Form>
                    <Input
                        type="search"
                        placeholder="Pesquise o nome ou o tipo do Pokémon"
                        className="me-2"
                        aria-label="Search"
                        value={result}
                        onChange={handlePress}
                    />
                </Form>

                <h1>Pokémons</h1>
                <div className="container1" >
                    <PokeCard pokemons={pokemons} />
                </div>
            </Container>
        </div>

    )


}

export default Home;
