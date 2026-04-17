import "./MostrarTarjetaPokemon.css";

const typeColors = {
  fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
  psychic: "#F85888", ice: "#98D8D8", dragon: "#7038F8", dark: "#705848",
  fairy: "#EE99AC", normal: "#A8A878", fighting: "#C03028", flying: "#A890F0",
  poison: "#A040A0", ground: "#E0C068", rock: "#B8A038", bug: "#A8B820",
  ghost: "#705898", steel: "#B8B8D0",
};

const statLabels = {
  hp: "HP", attack: "ATK", defense: "DEF",
  "special-attack": "SpA", "special-defense": "SpD", speed: "SPD",
};

function getStatColor(value) {
  if (value >= 100) return "#4CAF50";
  if (value >= 60) return "#FFD700";
  return "#FF5722";
}

export default function MostrarTarjetaPokemon({ pokemon }) {
  const mainType = pokemon?.types?.[0]?.type?.name;
  const cardBg = typeColors[mainType] ?? "#A8A878";

  return (
    <div className="pokemon-card" style={{ background: cardBg }}>

      <div className="pokemon-card__header">
        <span className="pokemon-card__name">{pokemon.name}</span>
        <span className="pokemon-card__number">#{String(pokemon.id).padStart(3, "0")}</span>
      </div>

      <div className="pokemon-card__image-wrapper">
        <img
          className="pokemon-card__image"
          src={pokemon.sprites?.other?.["official-artwork"]?.front_default ?? pokemon.sprites?.front_default}
          alt={pokemon.name}
        />
      </div>

      <div className="pokemon-card__types">
        {pokemon.types.map(({ type }) => (
          <span key={type.name} className="pokemon-card__type-badge">{type.name}</span>
        ))}
      </div>

      <div className="pokemon-card__info">
        <span>Altura: {(pokemon.height / 10).toFixed(1)} m</span>
        <span>Peso: {(pokemon.weight / 10).toFixed(1)} kg</span>
      </div>

      <div className="pokemon-card__stats">
        {pokemon.stats.map(({ stat, base_stat }) => (
          <div key={stat.name} className="pokemon-card__stat-row">
            <span className="pokemon-card__stat-label">
              {statLabels[stat.name] ?? stat.name.toUpperCase()}
            </span>
            <span className="pokemon-card__stat-value">{base_stat}</span>
            <div className="pokemon-card__stat-bar-bg">
              <div
                className="pokemon-card__stat-bar-fill"
                style={{
                  width: `${Math.min((base_stat / 255) * 100, 100)}%`,
                  background: getStatColor(base_stat),
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
