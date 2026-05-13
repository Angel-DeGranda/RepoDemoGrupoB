<script setup>
import { ref, onMounted } from 'vue';

const pokemon = ref(null);
const cargando = ref(true);

const obtenerPokemon = async () => {
  try {
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/700');
    const datos = await respuesta.json();
    pokemon.value = datos;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    cargando.value = false;
  }
};

onMounted(() => obtenerPokemon());
</script>

<template>
  <div class="poke-container">
    <div v-if="cargando" class="retro-text">Cargando datos...</div>

    <div v-else-if="pokemon" class="ds-card">
      <div class="ds-header">
        <span class="pokedex-number">No. {{ pokemon.id }}</span>
        <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      </div>

      <div class="screen">
        <img 
          :src="pokemon.sprites.front_default" 
          :alt="pokemon.name"
          class="pixel-art"
        />
      </div>

      <div class="ds-info">
        <div class="type-container">
          <span v-for="t in pokemon.types" :key="t.slot" :class="['type-tag', t.type.name]">
            {{ t.type.name.toUpperCase() }}
          </span>
        </div>
        
        <div class="data-box">
          <p>HT <span>{{ pokemon.height / 10 }} m</span></p>
          <p>WT <span>{{ pokemon.weight / 10 }} kg</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.poke-container {
  display: flex;
  justify-content: center;
  padding: 40px;
  background-color: #3e3e3e; /* Fondo oscuro tipo consola */
}

/* La Card con estilo Nintendo DS */
.ds-card {
  width: 280px;
  background: #c3c3c3; /* Gris clásico de menús */
  border: 4px solid #5a5a5a;
  border-radius: 10px;
  box-shadow: inset -4px -4px 0px #8a8a8a, inset 4px 4px 0px #ffffff;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace; /* Fuente retro */
}

/* Encabezado con degradado azulado de la Gen 4 */
.ds-header {
  background: linear-gradient(to bottom, #4a7ad6 0%, #294a94 100%);
  border: 2px solid #10214a;
  color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  text-shadow: 2px 2px #000;
}

.pokemon-name {
  margin: 0;
  font-size: 1.2rem;
  text-transform: uppercase;
}

/* "Pantalla" donde vive el sprite */
.screen {
  background: #f8f8f8;
  border: 4px solid #303030;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-bottom: 10px;
  position: relative;
}

.pixel-art {
  width: 120px;
  image-rendering: pixelated; /* ¡IMPORTANTE! Evita que el sprite se vea borroso */
}

/* Panel de información inferior */
.ds-info {
  background: #e0e0e8;
  border: 2px solid #888;
  padding: 8px;
}

.type-container {
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
}

.type-tag {
  font-size: 0.7rem;
  padding: 2px 8px;
  border: 1px solid #000;
  color: white;
  text-shadow: 1px 1px #000;
}

/* Colores de tipos (Ejemplo rápido) */
.electric { background-color: #f1c40f; }
.steel { background-color: #95a5a6; }

.data-box {
  background: white;
  border: 1px solid #555;
  padding: 5px;
  font-size: 0.8rem;
}

.data-box p {
  margin: 2px 0;
  display: flex;
  justify-content: space-between;
}

.retro-text {
  color: #42b883;
  font-family: monospace;
  font-size: 1.5rem;
}
</style>