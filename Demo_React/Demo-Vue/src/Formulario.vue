<script setup>
import { ref } from 'vue';

// 1. Estados para los inputs (lo que se escribe)
const nombreInput = ref('');
const emailInput = ref('');

// 2. Estado para mostrar la información (se llena al dar clic)
const usuarioConfirmado = ref(null);

// 3. Función para procesar el clic
const guardarDatos = () => {
  if (nombreInput.value && emailInput.value) {
    // Guardamos los datos actuales en nuestro objeto de confirmación
    usuarioConfirmado.value = {
      nombre: nombreInput.value,
      email: emailInput.value
    };
    
    // Opcional: Limpiar los inputs después de guardar
    nombreInput.value = '';
    emailInput.value = '';
  } else {
    alert("Por favor, llena ambos campos");
  }
};
</script>

<template>
  <div class="formulario-container">
    <h2>Registro de Usuario</h2>

    <div class="input-group">
      <input v-model="nombreInput" type="text" placeholder="Nombre" />
      <input v-model="emailInput" type="email" placeholder="Correo electrónico" />
      
      <button @click="guardarDatos">Mostrar Información</button>
    </div>

    <div v-if="usuarioConfirmado" class="preview">
      <h3>Usuario Registrado:</h3>
      <p><strong>Nombre:</strong> {{ usuarioConfirmado.nombre }}</p>
      <p><strong>Email:</strong> {{ usuarioConfirmado.email }}</p>
      
      <button class="btn-clear" @click="usuarioConfirmado = null">Limpiar</button>
    </div>
  </div>
</template>

<style scoped>
.formulario-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  padding: 12px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

button:hover {
  background-color: #33a06f;
}

.preview {
  margin-top: 20px;
  padding: 20px;
  background-color: #f0fdf4;
  border: 2px solid #42b883;
  border-radius: 10px;
  width: 100%;
  max-width: 320px;
  animation: fadeIn 0.3s ease-in;
}

.btn-clear {
  background-color: #e74c3c;
  margin-top: 10px;
  width: 100%;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>