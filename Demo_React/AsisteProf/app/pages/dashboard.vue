<script setup>
const { data: stats, refresh } = await useFetch('/api/stats');

const calcularPorcentaje = (asistencias, total) => {
  if (!total) return 0;
  return ((asistencias / total) * 100).toFixed(1);
};

const colorPorcentaje = (asistencias, total) => {
  const pct = Number(calcularPorcentaje(asistencias, total));
  if (pct >= 85) return 'text-green-600';
  if (pct >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

const bgBarPorcentaje = (asistencias, total) => {
  const pct = Number(calcularPorcentaje(asistencias, total));
  if (pct >= 85) return 'bg-green-500';
  if (pct >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

const estadoBadge = (asistencias, total) => {
  const pct = Number(calcularPorcentaje(asistencias, total));
  if (pct >= 85) return { text: 'Regular', cls: 'bg-green-100 text-green-700' };
  if (pct >= 70) return { text: 'En Riesgo', cls: 'bg-yellow-100 text-yellow-700' };
  return { text: 'Crítico', cls: 'bg-red-100 text-red-700' };
};

const totalEstudiantes = computed(() => stats.value?.length || 0);
const enRiesgo = computed(() =>
  stats.value?.filter(a => Number(calcularPorcentaje(a.asistencias, a.total_clases)) < 70).length || 0
);
const regulares = computed(() => totalEstudiantes.value - enRiesgo.value);
</script>

<template>
  <div class="min-h-screen bg-white">

    <!-- Header con estadísticas integradas -->
    <div class="bg-blue-950 text-white px-8 py-6">
      <div class="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-black">Estadísticas de Asistencia</h1>
          <p class="text-blue-400 text-sm mt-1">Resumen general del grupo</p>
        </div>
        <button
          @click="refresh"
          class="flex items-center gap-2 border border-blue-700 text-blue-200 hover:bg-blue-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          🔄 Actualizar
        </button>
      </div>

      <div class="flex gap-12">
        <div>
          <p class="text-3xl font-black">{{ totalEstudiantes }}</p>
          <p class="text-xs text-blue-400 uppercase font-bold mt-0.5">Total Alumnos</p>
        </div>
        <div>
          <p class="text-3xl font-black text-green-400">{{ regulares }}</p>
          <p class="text-xs text-blue-400 uppercase font-bold mt-0.5">Asistencia Regular</p>
        </div>
        <div>
          <p class="text-3xl font-black text-red-400">{{ enRiesgo }}</p>
          <p class="text-xs text-blue-400 uppercase font-bold mt-0.5">Asistencia Crítica</p>
        </div>
      </div>
    </div>

    <!-- Tabla full-width -->
    <table class="w-full">
      <thead>
        <tr class="border-b-2 border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 tracking-wide">
          <th class="px-8 py-3 text-center w-16">#</th>
          <th class="px-4 py-3 text-left">Alumno</th>
          <th class="px-8 py-3 text-center">Asistencias</th>
          <th class="px-8 py-3 text-center">Faltas</th>
          <th class="px-8 py-3 text-left">Porcentaje</th>
          <th class="px-8 py-3 text-center">Estado</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr
          v-for="(alumno, index) in stats"
          :key="alumno.nombre"
          class="hover:bg-gray-50 transition-colors"
        >
          <td class="px-8 py-4 text-gray-400 font-mono text-sm text-center">{{ index + 1 }}</td>
          <td class="px-4 py-4 font-semibold text-gray-800">{{ alumno.nombre }}</td>
          <td class="px-8 py-4 text-center font-bold text-green-600">{{ alumno.asistencias }}</td>
          <td class="px-8 py-4 text-center font-bold text-red-500">{{ alumno.faltas }}</td>
          <td class="px-8 py-4">
            <div class="flex items-center gap-3">
              <div class="flex-1 bg-gray-200 rounded-full h-2 min-w-24">
                <div
                  class="h-2 rounded-full transition-all"
                  :class="bgBarPorcentaje(alumno.asistencias, alumno.total_clases)"
                  :style="{ width: calcularPorcentaje(alumno.asistencias, alumno.total_clases) + '%' }"
                />
              </div>
              <span
                class="text-sm font-bold w-12 text-right"
                :class="colorPorcentaje(alumno.asistencias, alumno.total_clases)"
              >
                {{ calcularPorcentaje(alumno.asistencias, alumno.total_clases) }}%
              </span>
            </div>
          </td>
          <td class="px-8 py-4 text-center">
            <span
              class="text-xs font-bold px-3 py-1 rounded-full"
              :class="estadoBadge(alumno.asistencias, alumno.total_clases).cls"
            >
              {{ estadoBadge(alumno.asistencias, alumno.total_clases).text }}
            </span>
          </td>
        </tr>
        <tr v-if="!stats?.length">
          <td colspan="6" class="py-20 text-center text-gray-400">
            <p class="text-4xl mb-3">📊</p>
            <p class="font-semibold text-gray-500">No hay datos de asistencia registrados aún</p>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>
table { border-collapse: collapse; }
</style>
