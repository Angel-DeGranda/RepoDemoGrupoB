<script setup>
const { data: grupos, refresh: refGrupos } = await useFetch('/api/grupos');
const { data: estudiantes, refresh: refEstudiantes } = await useFetch('/api/estudiantes');

const nuevoGrupo = ref('');
const nuevoEstudiante = ref('');
const grupoSeleccionado = ref(null);

async function crearGrupo() {
  if (!nuevoGrupo.value) return alert("Escribe el nombre del grupo");
  await $fetch('/api/grupos', { method: 'POST', body: { nombre: nuevoGrupo.value } });
  nuevoGrupo.value = '';
  refGrupos();
}

async function crearEstudiante() {
  if (!nuevoEstudiante.value || !grupoSeleccionado.value) {
    return alert("Falta nombre del alumno o seleccionar grupo");
  }
  await $fetch('/api/estudiantes', {
    method: 'POST',
    body: { nombre: nuevoEstudiante.value, grupoId: grupoSeleccionado.value }
  });
  nuevoEstudiante.value = '';
  refEstudiantes();
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- Header -->
    <div class="bg-blue-950 text-white px-8 py-6">
      <h1 class="text-2xl font-black">Registro</h1>
      <p class="text-blue-400 text-sm mt-1">Administra grupos y alumnos del sistema</p>
    </div>

    <!-- Layout de dos columnas separadas por divider -->
    <div class="flex flex-1 divide-x divide-gray-200">

      <!-- Columna Grupos -->
      <div class="w-80 shrink-0 flex flex-col">
        <!-- Encabezado de sección -->
        <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
          <span class="text-lg">📁</span>
          <div>
            <h2 class="font-bold text-gray-800 text-sm">Grupos</h2>
            <p class="text-xs text-gray-500">Grupos del plantel</p>
          </div>
        </div>

        <!-- Formulario agregar grupo -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex gap-2">
            <input
              v-model="nuevoGrupo"
              placeholder="Ej: Programación 4to A"
              class="border border-gray-300 p-2 flex-grow rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none min-w-0"
              @keyup.enter="crearGrupo"
            />
            <button
              @click="crearGrupo"
              class="bg-blue-950 hover:bg-blue-900 text-white px-3 py-2 rounded-lg text-sm font-bold transition-colors shrink-0"
            >
              +
            </button>
          </div>
        </div>

        <!-- Lista de grupos -->
        <div class="flex-1 overflow-y-auto divide-y divide-gray-100">
          <div
            v-for="g in grupos"
            :key="g.id"
            class="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <span class="font-medium text-gray-800 text-sm">{{ g.nombre }}</span>
            <span class="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded border border-gray-200 shrink-0 ml-2">
              ID {{ g.id }}
            </span>
          </div>
          <div v-if="!grupos?.length" class="px-6 py-16 text-center text-gray-400">
            <p class="text-3xl mb-2">📁</p>
            <p class="text-sm">Sin grupos registrados</p>
          </div>
        </div>
      </div>

      <!-- Columna Alumnos -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Encabezado de sección -->
        <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
          <span class="text-lg">👨‍🎓</span>
          <div>
            <h2 class="font-bold text-gray-800 text-sm">Alumnos</h2>
            <p class="text-xs text-gray-500">Inscripción y asignación a grupos</p>
          </div>
        </div>

        <!-- Formulario agregar alumno -->
        <div class="px-6 py-4 border-b border-gray-200 flex gap-3 items-center flex-wrap">
          <input
            v-model="nuevoEstudiante"
            placeholder="Nombre completo del alumno"
            class="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none flex-1 min-w-40"
          />
          <select
            v-model="grupoSeleccionado"
            class="border border-gray-300 p-2 rounded-lg text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 w-52 shrink-0"
          >
            <option :value="null" disabled>Selecciona un grupo</option>
            <option v-for="g in grupos" :key="g.id" :value="g.id">{{ g.nombre }}</option>
          </select>
          <button
            @click="crearEstudiante"
            class="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shrink-0"
          >
            Registrar
          </button>
        </div>

        <!-- Tabla de alumnos full-width -->
        <div class="flex-1 overflow-y-auto">
          <table class="w-full text-sm">
            <thead class="sticky top-0 border-b border-gray-200 bg-gray-50">
              <tr class="text-xs uppercase text-gray-500 tracking-wide">
                <th class="px-6 py-3 text-center w-14">#</th>
                <th class="px-4 py-3 text-left">Nombre</th>
                <th class="px-6 py-3 text-left">Grupo</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(e, index) in estudiantes"
                :key="e.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-3.5 text-gray-400 font-mono text-center">{{ index + 1 }}</td>
                <td class="px-4 py-3.5 font-medium text-gray-800">{{ e.nombre }}</td>
                <td class="px-6 py-3.5">
                  <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold">
                    {{ e.nombre_grupo }}
                  </span>
                </td>
              </tr>
              <tr v-if="!estudiantes?.length">
                <td colspan="3" class="py-16 text-center text-gray-400">
                  <p class="text-3xl mb-2">👨‍🎓</p>
                  <p class="text-sm">No hay alumnos registrados</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
input::placeholder { color: #a0aec0; }
table { border-collapse: collapse; }
</style>
