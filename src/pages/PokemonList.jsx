import { useState } from "react";
import usePokemonAPI from "../services/PokeApiService";

const PAGE_SIZE = 20;

const getSpriteUrl = (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const PokemonList = () => {
    const { pokemonList, status } = usePokemonAPI();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(pokemonList.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);

    const paginatedList = pokemonList.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <section className="page">
            <div className="pokedex-mint">
                <h2 className="pokedex-mint-title">Conoce a los Pokémon</h2>

                {status === "loading" && (
                    <div className="pokedex-status">Cargando Pokémon...</div>
                )}

                {status === "error" && (
                    <div className="pokedex-status">
                        No se pudo cargar la lista de Pokémon.
                    </div>
                )}

                {status === "success" && paginatedList.length > 0 && (
                    <div className="pokedex-grid">
                        {paginatedList.map((pokemon) => (
                            <div className="poke-card" key={pokemon.id}>
                                <img
                                    className="poke-card-img"
                                    src={getSpriteUrl(pokemon.id)}
                                    alt={pokemon.name}
                                    loading="lazy"
                                />
                                <span className="poke-card-id">
                                    N.° {String(pokemon.id).padStart(4, "0")}
                                </span>
                                <span className="poke-card-name">{pokemon.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {status === "success" && paginatedList.length === 0 && (
                    <div className="pokedex-status">No hay Pokémon para mostrar.</div>
                )}
            </div>

            <button
                type="button"
                className="pokedex-fab pokedex-fab-prev"
                onClick={() => canGoPrev && setPage(currentPage - 1)}
                disabled={!canGoPrev}
                aria-label="Página anterior"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 6l-6 6 6 6M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <button
                type="button"
                className="pokedex-fab pokedex-fab-next"
                onClick={() => canGoNext && setPage(currentPage + 1)}
                disabled={!canGoNext}
                aria-label="Página siguiente"
            >
                <span className="pokedex-fab-next-label">Siguiente</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </section>
    );
};

export default PokemonList;
