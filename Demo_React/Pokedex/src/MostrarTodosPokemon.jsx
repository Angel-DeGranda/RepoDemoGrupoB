import { useState, useEffect } from "react";
import "./MostrarTodosPokemon.css";

const typeColors = {
  fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
  psychic: "#F85888", ice: "#98D8D8", dragon: "#7038F8", dark: "#705848",
  fairy: "#EE99AC", normal: "#A8A878", fighting: "#C03028", flying: "#A890F0",
  poison: "#A040A0", ground: "#E0C068", rock: "#B8A038", bug: "#A8B820",
  ghost: "#705898", steel: "#B8B8D0",
};

const PAGE_SIZE = 20;

export default function MostrarTodosPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    const offset = page * PAGE_SIZE;

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalCount(data.count);
        return Promise.all(data.results.map((p) => fetch(p.url).then((r) => r.json())));
      })
      .then((detalles) => { setPokemons(detalles); setLoading(false); })
      .catch(() => setLoading(false));
  }, [page]);

  if (loading) return <p className="todos-status">Cargando...</p>;

  return (
    <>
      <div className="todos-grid">
        {pokemons.map((pokemon) => {
          const mainType = pokemon.types[0].type.name;
          return (
            <div
              key={pokemon.id}
              className="todos-card"
              style={{ background: typeColors[mainType] ?? "#A8A878" }}
            >
              <span className="todos-card__number">#{String(pokemon.id).padStart(3, "0")}</span>
              <img
                className="todos-card__image"
                src={pokemon.sprites?.other?.["official-artwork"]?.front_default ?? pokemon.sprites?.front_default}
                alt={pokemon.name}
              />
              <span className="todos-card__name">{pokemon.name}</span>
              <div className="todos-card__types">
                {pokemon.types.map(({ type }) => (
                  <span key={type.name} className="todos-card__type-badge">{type.name}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="todos-pagination">
          <button
            className="todos-pagination__btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
          >
            &#8592;
          </button>
          <span className="todos-pagination__info">{page + 1} / {totalPages}</span>
          <button
            className="todos-pagination__btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
          >
            &#8594;
          </button>
        </div>
      )}
    </>
  );
}
