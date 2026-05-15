<script setup>
const fechaHoy = new Date().toISOString().split('T')[0];
const fechaFormateada = new Date().toLocaleDateString('es-MX', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const { data: grupos } = await useFetch('/api/grupos');
const grupoSeleccionado = ref(null);
const listaAsistencia = ref([]);
const guardado = ref(false);
const cargando = ref(false);

async function seleccionarGrupo(grupo) {
  grupoSeleccionado.value = grupo;
  guardado.value = false;
  cargando.value = true;
  const estudiantes = await $fetch(`/api/estudiantes?grupoId=${grupo.id}`);
  listaAsistencia.value = estudiantes.map(est => ({
    estudianteId: est.id,
    nombre: est.nombre,
    presente: false
  }));
  cargando.value = false;
}

const totalPresentes = computed(() => listaAsistencia.value.filter(a => a.presente).length);
const totalAusentes = computed(() => listaAsistencia.value.filter(a => !a.presente).length);

async function guardarAsistencia() {
  await $fetch('/api/asistencia', {
    method: 'POST',
    body: { fecha: fechaHoy, asistencias: listaAsistencia.value }
  });
  guardado.value = true;
  setTimeout(() => guardado.value = false, 3000);
}
</script>

<template>
  <div class="min-h-screen bg-white">

    <!-- PASO 1: Selección de grupo -->
    <div v-if="!grupoSeleccionado">
      <div class="bg-blue-950 text-white px-8 py-6">
        <p class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Paso 1 — Selecciona el grupo</p>
        <h1 class="text-2xl font-black">Pase de Lista</h1>
        <p class="text-blue-300 text-sm mt-1 capitalize">{{ fechaFormateada }}</p>
      </div>

      <div class="divide-y divide-gray-100">
        <button
          v-for="g in grupos"
          :key="g.id"
          @click="seleccionarGrupo(g)"
          class="w-full flex items-center gap-5 px-8 py-5 hover:bg-blue-50 transition-colors text-left group"
        >
          <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-black text-sm group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors shrink-0">
            {{ g.id }}
          </div>
          <span class="flex-1 font-semibold text-gray-800 text-base">{{ g.nombre }}</span>
          <span class="text-blue-400 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </button>

        <div v-if="!grupos?.length" class="px-8 py-20 text-center text-gray-400">
          <p class="text-5xl mb-4">📁</p>
          <p class="font-semibold text-gray-500 text-lg">No hay grupos registrados</p>
          <NuxtLink to="/configuracion" class="text-blue-600 text-sm mt-3 inline-block hover:underline">
            Ir a Registro para crear grupos →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- PASO 2: Lista de asistencia -->
    <div v-else>
      <!-- Header con contadores -->
      <div class="bg-blue-950 text-white px-8 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Lista de Asistencia</p>
            <h1 class="text-2xl font-black">{{ grupoSeleccionado.nombre }}</h1>
            <p class="text-blue-300 text-sm mt-1 capitalize">{{ fechaFormateada }}</p>
          </div>
          <div class="flex gap-10 text-center">
            <div>
              <p class="text-3xl font-black">{{ listaAsistencia.length }}</p>
              <p class="text-xs text-blue-400 uppercase font-bold mt-0.5">Total</p>
            </div>
            <div>
              <p class="text-3xl font-black text-green-400">{{ totalPresentes }}</p>
              <p class="text-xs text-blue-400 uppercase font-bold mt-0.5">Presentes</p>
            </div>
            <div>
              <p class="text-3xl font-black text-red-400">{{ totalAusentes }}</p>
              <p class="text-xs text-blue-400 uppercase font-bold mt-0.5">Ausentes</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cargando -->
      <div v-if="cargando" class="py-20 text-center text-gray-400">
        <p class="text-4xl mb-3">⏳</p>
        <p class="font-medium">Cargando alumnos...</p>
      </div>

      <!-- Tabla full-width -->
      <table v-else class="w-full">
        <thead>
          <tr class="border-b-2 border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 tracking-wide">
            <th class="px-8 py-3 text-center w-16">#</th>
            <th class="px-4 py-3 text-left">Alumno</th>
            <th class="px-8 py-3 text-right">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(item, index) in listaAsistencia"
            :key="item.estudianteId"
            @click="item.presente = !item.presente"
            class="cursor-pointer hover:bg-gray-50 transition-colors select-none"
            :class="item.presente ? 'bg-green-50 hover:bg-green-50' : ''"
          >
            <td class="px-8 py-4 text-gray-400 font-mono text-sm text-center">{{ index + 1 }}</td>
            <td class="px-4 py-4 font-semibold text-gray-800 text-base">{{ item.nombre }}</td>
            <td class="px-8 py-4">
              <div class="flex items-center justify-end gap-3">
                <span
                  class="text-xs font-bold px-3 py-1 rounded-full"
                  :class="item.presente ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                >
                  {{ item.presente ? 'PRESENTE' : 'AUSENTE' }}
                </span>
                <div
                  class="w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0"
                  :class="item.presente ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'"
                >
                  <span v-if="item.presente" class="text-white text-xs font-black leading-none">✓</span>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="!listaAsistencia.length">
            <td colspan="3" class="py-20 text-center text-gray-400">
              <p class="text-4xl mb-3">👨‍🎓</p>
              <p class="font-semibold text-gray-500">Este grupo no tiene alumnos registrados</p>
              <NuxtLink to="/configuracion" class="text-blue-600 text-sm mt-2 inline-block hover:underline">
                Ir a Registro para agregar alumnos →
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Barra de acción inferior -->
      <div class="border-t-2 border-gray-200 px-8 py-4 flex items-center justify-between bg-gray-50">
        <button
          @click="grupoSeleccionado = null; listaAsistencia = []"
          class="text-sm text-gray-500 hover:text-gray-800 font-semibold transition-colors"
        >
          ← Cambiar grupo
        </button>
        <button
          @click="guardarAsistencia"
          :disabled="!listaAsistencia.length"
          class="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
        >
          <span v-if="guardado">✅ Guardado</span>
          <span v-else>💾 Guardar Asistencia</span>
        </button>
      </div>
    </div>

  </div>
</template>
