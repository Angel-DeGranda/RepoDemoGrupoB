import { useState } from "react";
import "./Contenedor.css";
import MostrarTarjetaPokemon from "./MostrarTarjetaPokemon";
import MostrarTodosPokemon from "./MostrarTodosPokemon";

export default function Contenedor() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarPokemon = () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setPokemon(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon no encontrado");
        return res.json();
      })
      .then((data) => { setPokemon(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setPokemon(null);
      setError("");
    }
  };

  return (
    <div className="contenedor-page">
      <div className="contenedor-search">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && buscarPokemon()}
          placeholder="Nombre o número..."
        />
        <button onClick={buscarPokemon}>Buscar</button>
      </div>

      {loading && <p className="contenedor-status">Cargando...</p>}
      {error && <p className="contenedor-error">{error}</p>}

      {pokemon
        ? <MostrarTarjetaPokemon pokemon={pokemon} />
        : !loading && !error && <MostrarTodosPokemon />
      }
    </div>
  );
}
