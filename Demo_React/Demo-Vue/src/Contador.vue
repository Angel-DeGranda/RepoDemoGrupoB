<script setup>
import { ref } from 'vue';

// Definimos la variable reactiva
// En React sería: const [count, setCount] = useState(0)
const count = ref(0);

// Funciones para modificar el estado
const incrementar = () => {
  count.value++; // En Vue mutamos directamente el .value
};

const decrementar = () => {
  count.value--;
};
</script>

<template>
  <div class="container">
    <h1>Contador</h1>
    <p class="numero">{{ count }}</p>
    
    <div class="botones">
      <button @click="decrementar">Decrementar</button>
      <button @click="incrementar">Incrementar</button>
    </div>
  </div>
</template>

<style scoped>
/* Centramos todo el contenido del componente */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 200px; /* Un poco de espacio para que se note el centrado */
  font-family: sans-serif;
}

.numero {
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;
}

.botones {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
}

button {
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #42b883;
  background-color: white;
  transition: 0.3s;
}

button:hover {
  background-color: #42b883;
  color: white;
}
</style>
