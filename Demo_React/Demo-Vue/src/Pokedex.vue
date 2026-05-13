<script setup>
import { ref, onMounted, computed } from 'vue';

const pokemones = ref([]);
const indiceActivo = ref(0);
const paginaActual = ref(0);
const cargando = ref(true);
const POR_PAGINA = 9;

const statNames = {
  hp: 'HP', attack: 'ATK', defense: 'DEF',
  'special-attack': 'Sp.A', 'special-defense': 'Sp.D', speed: 'VEL',
};

const typeColors = {
  normal: '#9199a1', fire: '#e8703a', water: '#4d90d5', grass: '#63bb5b',
  electric: '#f3d23b', ice: '#74cec0', fighting: '#ce416b', poison: '#ab6ac8',
  ground: '#d97746', flying: '#8fa8dd', psychic: '#f97176', bug: '#91c12f',
  rock: '#c5b78c', ghost: '#5269ac', dragon: '#0b6dc3', dark: '#5a5369',
  steel: '#5a8ea2', fairy: '#ec8fe6',
};

const obtenerPokemones = async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=27');
    const data = await res.json();
    const promesas = data.results.map(p => fetch(p.url).then(r => r.json()));
    pokemones.value = await Promise.all(promesas);
  } catch (e) {
    console.error('Error cargando la Pokédex', e);
  } finally {
    cargando.value = false;
  }
};

const totalPaginas = computed(() => Math.ceil(pokemones.value.length / POR_PAGINA));

const pokemonesPagina = computed(() => {
  const inicio = paginaActual.value * POR_PAGINA;
  return pokemones.value.slice(inicio, inicio + POR_PAGINA);
});

const pokemonActual = computed(() => pokemones.value[indiceActivo.value]);

const seleccionar = (pokemon) => {
  indiceActivo.value = pokemones.value.findIndex(p => p.id === pokemon.id);
};

const estaActivo = (pokemon) =>
  indiceActivo.value === pokemones.value.findIndex(p => p.id === pokemon.id);

const irPagina = (n) => {
  if (n >= 0 && n < totalPaginas.value) paginaActual.value = n;
};

const formatNum = (id) => `N.º ${id.toString().padStart(4, '0')}`;

onMounted(obtenerPokemones);
</script>

<template>
  <div class="dex-root">

    <div v-if="cargando" class="loader">
      <div class="spinner"></div>
      <p>Cargando Pokédex de Paldea…</p>
    </div>

    <div v-else class="dex-shell">

      <!-- Barra superior -->
      <div class="dex-topbar">
        <span class="dex-logo">POKéDEX</span>
        <span class="dex-region">Paldea</span>
        <span class="dex-count">{{ paginaActual + 1 }}/{{ totalPaginas }}</span>
      </div>

      <div class="dex-body">

        <!-- Panel libro: cuadrícula de entradas -->
        <div class="book-panel">
          <div class="entries-grid">
            <button
              v-for="pokemon in pokemonesPagina"
              :key="pokemon.id"
              :class="['entry', { 'entry--active': estaActivo(pokemon) }]"
              @click="seleccionar(pokemon)"
            >
              <img
                :src="pokemon.sprites.front_default"
                :alt="pokemon.name"
                class="entry-sprite"
              />
              <span class="entry-num">{{ formatNum(pokemon.id) }}</span>
            </button>
          </div>

          <!-- Paginador -->
          <div class="paginator">
            <button class="pg-btn" :disabled="paginaActual === 0" @click="irPagina(paginaActual - 1)">◄</button>
            <div class="pg-dots">
              <button
                v-for="i in totalPaginas"
                :key="i"
                :class="['pg-dot', { 'pg-dot--active': i - 1 === paginaActual }]"
                @click="irPagina(i - 1)"
              ></button>
            </div>
            <button class="pg-btn" :disabled="paginaActual === totalPaginas - 1" @click="irPagina(paginaActual + 1)">►</button>
          </div>
        </div>

        <!-- Separador -->
        <div class="sep"></div>

        <!-- Panel detalle -->
        <Transition name="slide-fade" mode="out-in">
          <div class="detail-panel" v-if="pokemonActual" :key="pokemonActual.id">

            <div class="detail-header">
              <span class="detail-num">{{ formatNum(pokemonActual.id) }}</span>
              <div class="detail-types">
                <span
                  v-for="t in pokemonActual.types"
                  :key="t.slot"
                  class="type-chip"
                  :style="{ background: typeColors[t.type.name] ?? '#666' }"
                >{{ t.type.name }}</span>
              </div>
            </div>

            <div class="detail-artwork">
              <img
                :src="pokemonActual.sprites.other['official-artwork'].front_default"
                :alt="pokemonActual.name"
                class="detail-img"
              />
            </div>

            <h2 class="detail-name">{{ pokemonActual.name }}</h2>

            <div class="stats">
              <div class="stat" v-for="s in pokemonActual.stats" :key="s.stat.name">
                <span class="stat-label">{{ statNames[s.stat.name] ?? s.stat.name }}</span>
                <div class="stat-track">
                  <div
                    class="stat-fill"
                    :style="{
                      width: Math.min(s.base_stat / 255 * 100, 100) + '%',
                      background: typeColors[pokemonActual.types[0].type.name] ?? '#4fc3f7'
                    }"
                  ></div>
                </div>
                <span class="stat-val">{{ s.base_stat }}</span>
              </div>
            </div>

          </div>
        </Transition>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Base ──────────────────────────────────────── */
.dex-root {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0b0b14;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  padding: 20px;
}

/* ── Loader ────────────────────────────────────── */
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: #5bbfee;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 4px solid #1a1a2e;
  border-top-color: #5bbfee;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Carcasa ───────────────────────────────────── */
.dex-shell {
  width: 100%;
  max-width: 780px;
  background: #13131f;
  border-radius: 18px;
  border: 1px solid #1f1f35;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

/* ── Topbar ────────────────────────────────────── */
.dex-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 22px;
  background: #1a1a2c;
  border-bottom: 1px solid #1f1f35;
}

.dex-logo {
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 3px;
  color: #e4e4f0;
}

.dex-region {
  font-size: 0.72rem;
  color: #55556a;
  letter-spacing: 1px;
}

.dex-count {
  font-size: 0.75rem;
  font-weight: 700;
  color: #5bbfee;
}

/* ── Layout principal ──────────────────────────── */
.dex-body {
  display: flex;
  min-height: 430px;
}

/* ── Panel libro ───────────────────────────────── */
.book-panel {
  flex: 1.05;
  padding: 18px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.entries-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  flex: 1;
}

.entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: #1b1b2a;
  border: 1px solid #22223a;
  border-radius: 10px;
  padding: 6px 4px 5px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  gap: 0;
}

.entry:hover {
  background: #21213a;
  border-color: #3a3a55;
}

.entry--active {
  background: #142040;
  border-color: #5bbfee;
  box-shadow: 0 0 14px rgba(91, 191, 238, 0.25);
}

.entry-sprite {
  width: 60px;
  height: 60px;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
  transition: filter 0.15s;
}

.entry--active .entry-sprite {
  filter: drop-shadow(0 0 8px rgba(91, 191, 238, 0.55));
}

.entry-num {
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #44445a;
  margin-top: 2px;
  transition: color 0.15s;
}

.entry--active .entry-num {
  color: #5bbfee;
}

/* ── Paginador ─────────────────────────────────── */
.paginator {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pg-btn {
  background: #1b1b2a;
  border: 1px solid #22223a;
  color: #55556a;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pg-btn:hover:not(:disabled) {
  background: #22223a;
  color: #5bbfee;
  border-color: #5bbfee;
}

.pg-btn:disabled { opacity: 0.25; cursor: not-allowed; }

.pg-dots { display: flex; gap: 6px; align-items: center; }

.pg-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22223a;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: 0.2s;
}

.pg-dot--active {
  background: #5bbfee;
  transform: scale(1.5);
}

/* ── Separador ─────────────────────────────────── */
.sep {
  width: 1px;
  background: #1f1f35;
  margin: 18px 0;
}

/* ── Panel detalle ─────────────────────────────── */
.detail-panel {
  flex: 1;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.detail-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-num {
  font-size: 0.7rem;
  font-weight: 700;
  color: #5bbfee;
  letter-spacing: 1px;
}

.detail-types {
  display: flex;
  gap: 5px;
}

.type-chip {
  padding: 2px 10px;
  border-radius: 20px;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.detail-artwork {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-img {
  width: 145px;
  height: 145px;
  object-fit: contain;
  filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.5));
}

.detail-name {
  text-transform: capitalize;
  font-size: 1.25rem;
  font-weight: 800;
  color: #e4e4f0;
  margin: 0;
  letter-spacing: 0.5px;
}

/* ── Stats ─────────────────────────────────────── */
.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 4px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 7px;
}

.stat-label {
  font-size: 0.58rem;
  font-weight: 700;
  color: #44445a;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  width: 30px;
  text-align: right;
  flex-shrink: 0;
}

.stat-track {
  flex: 1;
  height: 4px;
  background: #1b1b2a;
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.45s ease;
}

.stat-val {
  font-size: 0.62rem;
  font-weight: 600;
  color: #55556a;
  width: 24px;
  text-align: right;
  flex-shrink: 0;
}

/* ── Transición de detalle ─────────────────────── */
.slide-fade-enter-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.slide-fade-leave-active { transition: opacity 0.15s ease; }
.slide-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.slide-fade-leave-to     { opacity: 0; }
</style>
