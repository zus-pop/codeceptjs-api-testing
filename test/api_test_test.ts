import { PokemonResponse } from "../responseType.ts";
import assert from "assert";

Feature("Pokémon API Testing");

const pokemonProps: (keyof PokemonResponse)[] = [
    "id",
    "name",
    "height",
    "abilities",
    "moves",
    "base_experience",
    "species",
    "sprites",
    "forms",
    "held_items",
];

// https://pokeapi.co/api/v2/pokemon
Scenario("Get a list of Pokémon", async ({ I }) => {
    await I.sendGetRequest("/pokemon");
    I.seeResponseCodeIs(200);
    I.seeResponseContainsKeys(["results", "count"]);
});

// https://pokeapi.co/api/v2/pokemon/pikachu
Scenario("Get a specific Pokémon by name", async ({ I }) => {
    const pokemonName = "pikachu";
    await I.sendGetRequest(`/pokemon/${pokemonName}`);
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({ name: pokemonName });
});

// https://pokeapi.co/api/v2/pokemon/pikachu
Scenario("Validate Pokémon response fields", async ({ I }) => {
    const pokemonName = "pikachu";
    await I.sendGetRequest(`/pokemon/${pokemonName}`);
    I.seeResponseCodeIs(200);
    I.seeResponseContainsKeys(pokemonProps);
});

// https://pokeapi.co/api/v2/pokemon/25
Scenario("Get a Pokémon by ID", async ({ I }) => {
    const pokemonId = 25; // Pikachu's ID
    const response = await I.sendGetRequest(`/pokemon/${pokemonId}`);
    I.seeResponseCodeIs(200);
    const pokemon: PokemonResponse = response.data;

    I.seeResponseContainsJson({ id: pokemonId });
    assert.strictEqual(
        pokemon.name,
        "pikachu",
        "The Pokémon with ID 25 should be Pikachu"
    );
});

// https://pokeapi.co/api/v2/pokemon?limit=30&offset=0
Scenario("Get a list of Pokémon with pagination", async ({ I }) => {
    const limit = 30;
    const offset = 0;
    const response = await I.sendGetRequest(
        `/pokemon?limit=${limit}&offset=${offset}`
    );
    I.seeResponseCodeIs(200);
    const data = response.data;

    assert.strictEqual(
        data.results.length,
        limit,
        `Should return ${limit} Pokémon`
    );
    I.seeResponseContainsJson({
        next: `https://pokeapi.co/api/v2/pokemon?offset=${
            offset + limit
        }&limit=${limit}`,
        previous: null,
    });
});

// https://pokeapi.co/api/v2/ability/static
Scenario("Get a Pokémon ability", async ({ I }) => {
    const abilityName = "static";
    const response = await I.sendGetRequest(`/ability/${abilityName}`);
    I.seeResponseCodeIs(200);
    const ability = response.data;

    I.seeResponseContainsJson({ name: abilityName });
    assert.ok(
        ability.pokemon.length > 0,
        "The ability should be associated with at least one Pokémon"
    );
});

// https://pokeapi.co/api/v2/type/electric
Scenario("Get a Pokémon type", async ({ I }) => {
    const typeName = "electric";
    const id = 13;
    const response = await I.sendGetRequest(`/type/${typeName}`);
    I.seeResponseCodeIs(200);
    const type = response.data;

    I.seeResponseContainsJson({ name: typeName, id });
    assert.ok(
        type.pokemon.length > 0,
        "The type should be associated with at least one Pokémon"
    );
});

// https://pokeapi.co/api/v2/pokemon-species/pikachu
Scenario("Get a Pokémon species", async ({ I }) => {
    const speciesName = "pikachu";
    const response = await I.sendGetRequest(`/pokemon-species/${speciesName}`);
    I.seeResponseCodeIs(200);
    const species = response.data;

    I.seeResponseContainsJson({ name: speciesName });
    assert.ok(
        species.varieties.length > 0,
        "The species should have at least one variety"
    );
});

// https://pokeapi.co/api/v2/pokemon/messi-is-the-goat
Scenario("Get a non-existent Pokémon", async ({ I }) => {
    const nonExistentPokemon = "messi-is-the-goat";
    await I.sendGetRequest(`/pokemon/${nonExistentPokemon}`);
    I.seeResponseCodeIs(404);
});

// https://pokeapi.co/api/v2/evolution-chain/10
Scenario("Get evolution chain", async ({ I }) => {
    const evolutionChainId = 10; // Pikachu's evolution chain
    const response = await I.sendGetRequest(
        `/evolution-chain/${evolutionChainId}`
    );
    I.seeResponseCodeIs(200);
    const evolutionChain = response.data;

    assert.strictEqual(
        evolutionChain.chain.species.name,
        "pichu",
        "The first Pokémon in the chain should be Pichu"
    );
});
