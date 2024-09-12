export interface PokemonsResponse {
    count: number;
    results: [
        {
            name: string;
            url: string;
        }
    ];
    next: string;
    previous: string;
}

export interface PokemonResponse {
    abilities: Array<{
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }>;
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: Array<object>;
    game_indices: Array<object>;
    height: number;
    held_items: Array<object>;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<{
        move: {
            name: string;
            url: string;
        };
        version_group_details: Array<object>;
    }>;
    name: string;
    order: number;
    past_abilities: Array<any>;
    species: {
        name: string;
        url: string;
    };
    sprites: object;
}
