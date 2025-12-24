import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { DatabaseService, Note } from './database/DatabaseService'

// Initialize database
let db: DatabaseService

function createWindow(): void {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#1a1a2e',
    ...(process.platform === 'linux' ? { icon: join(__dirname, '../../build/icon.png') } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    require('electron').shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the remote URL for development or the local html file for production
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Set up IPC handlers for database operations
function setupDatabaseHandlers(): void {
  ipcMain.handle('notes:create', async (_, note: Partial<Note>) => {
    return db.createNote(note)
  })

  ipcMain.handle('notes:update', async (_, id: string, updates: Partial<Note>) => {
    return db.updateNote(id, updates)
  })

  ipcMain.handle('notes:delete', async (_, id: string) => {
    return db.deleteNote(id)
  })

  ipcMain.handle('notes:get', async (_, id: string) => {
    return db.getNote(id)
  })

  ipcMain.handle('notes:list', async (_, folder?: string) => {
    return db.listNotes(folder)
  })

  ipcMain.handle('notes:search', async (_, query: string) => {
    return db.searchNotes(query)
  })

  ipcMain.handle('tags:add', async (_, noteId: string, tag: string) => {
    return db.addTag(noteId, tag)
  })

  ipcMain.handle('tags:remove', async (_, noteId: string, tag: string) => {
    return db.removeTag(noteId, tag)
  })

  ipcMain.handle('tags:get', async (_, noteId: string) => {
    return db.getNoteTags(noteId)
  })

  ipcMain.handle('folders:list', async () => {
    return db.getFolders()
  })
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.nexus')

  // Initialize database and IPC handlers
  db = new DatabaseService()
  setupDatabaseHandlers()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Clean up database connection before quitting
app.on('before-quit', () => {
  if (db) {
    db.close()
  }
})
