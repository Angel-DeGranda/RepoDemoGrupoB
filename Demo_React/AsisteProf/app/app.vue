<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-blue-950 text-white shadow-lg">
      <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
            <span class="text-blue-950 font-black text-lg">A</span>
          </div>
          <div>
            <p class="font-black text-base leading-tight tracking-wide">AsisteProf</p>
            <p class="text-blue-400 text-xs">Sistema de Control de Asistencia</p>
          </div>
        </div>
        <nav class="flex gap-1">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors"
            active-class="bg-blue-800"
          >
            <span>📋</span> Pase de Lista
          </NuxtLink>
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors"
            active-class="bg-blue-800"
          >
            <span>📊</span> Estadísticas
          </NuxtLink>
          <NuxtLink
            to="/configuracion"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors"
            active-class="bg-blue-800"
          >
            <span>📝</span> Registro
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 flex flex-col">
      <NuxtPage />
    </main>

    <footer class="bg-blue-950 text-blue-400 text-center text-xs py-3 border-t border-blue-900">
      AsisteProf &copy; {{ new Date().getFullYear() }} — Sistema de Control de Asistencia Escolar
    </footer>
  </div>
</template>
