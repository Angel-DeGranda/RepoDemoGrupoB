const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const http = require('http')

let serverProcess

// Espera a que el servidor Nuxt responda antes de abrir la ventana
function waitForServer(retries = 30, delay = 500) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get('http://127.0.0.1:3000', () => {
        req.destroy()
        resolve()
      })
      req.on('error', () => {
        if (retries-- > 0) {
          setTimeout(attempt, delay)
        } else {
          reject(new Error('El servidor Nuxt no respondió'))
        }
      })
      req.end()
    }
    attempt()
  })
}

app.whenReady().then(async () => {
  const serverEntry = path.join(__dirname, '../.output/server/index.mjs')

  // Arranca el servidor Nuxt (Nitro) con el Node.js del sistema
  serverProcess = spawn('node', [serverEntry], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3000', HOST: '127.0.0.1' }
  })

  serverProcess.stdout.on('data', d => console.log('[nuxt]', d.toString().trim()))
  serverProcess.stderr.on('data', d => console.error('[nuxt]', d.toString().trim()))

  try {
    await waitForServer()
  } catch (e) {
    console.error('No se pudo iniciar el servidor:', e.message)
    app.quit()
    return
  }

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'AsisteProf',
    webPreferences: { nodeIntegration: false, contextIsolation: true }
  })

  win.loadURL('http://127.0.0.1:3000')
})

app.on('window-all-closed', () => {
  serverProcess?.kill()
  app.quit()
})
