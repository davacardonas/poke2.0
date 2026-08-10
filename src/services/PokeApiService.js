import { useEffect, useState } from "react";

const baseAPIUrl = "https://pokeapi.co/api/v2/";

// La app solo debe mostrar los primeros 100 Pokémon.
export const TOTAL_POKEMON = 100;

const getIdFromUrl = (url) => Number(url.split("/").filter(Boolean).pop());

const usePokemonApi = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        fetch(`${baseAPIUrl}pokemon?offset=0&limit=${TOTAL_POKEMON}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No se pudo obtener la lista de Pokémon");
                }
                return res.json();
            })
            .then((data) => {
                if (cancelled) return;

                const list = (data.results || []).map((pokemon) => ({
                    id: getIdFromUrl(pokemon.url),
                    name: pokemon.name,
                }));

                list.sort((a, b) => a.id - b.id);

                setPokemonList(list);
                setStatus("success");
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err);
                setStatus("error");
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { pokemonList, status, error };
};

export default usePokemonApi;
