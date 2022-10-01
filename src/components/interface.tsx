export interface PokeDetails {
    name: any;
    url: string;
    id: number;
    sprites: Sprites;
    weight: number;
    height: number;
    types: Type[];
}

interface Type {
    slot: number;
    type: Type2;
}

interface Type2 {
    name: string;
    url: string;
}

interface Sprites {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}