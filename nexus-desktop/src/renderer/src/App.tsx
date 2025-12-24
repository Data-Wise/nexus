import { useEffect } from 'react'
import { useNotesStore } from './store/useNotesStore'

function App() {
  const { notes, isLoading, error, loadNotes, createNote, selectedNoteId, selectNote } = useNotesStore()

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  const handleCreateNote = async () => {
    await createNote({
      title: `New Note ${new Date().toLocaleTimeString()}`,
      content: '# Start writing...',
      folder: 'inbox'
    })
  }

  const selectedNote = notes.find(n => n.id === selectedNoteId)

  return (
    <div className="w-full h-full bg-nexus-bg-primary text-nexus-text-primary flex">
      {/* Sidebar */}
      <div className="w-64 bg-nexus-bg-secondary border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold mb-2">Nexus</h1>
          <button
            onClick={handleCreateNote}
            className="w-full bg-nexus-accent hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            + New Note
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-gray-400 text-sm">Loading notes...</div>
          )}
          {error && (
            <div className="p-4 text-red-400 text-sm">Error: {error}</div>
          )}
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => selectNote(note.id)}
              className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-nexus-bg-primary transition-colors ${
                selectedNoteId === note.id ? 'bg-nexus-bg-primary' : ''
              }`}
            >
              <div className="font-medium truncate">{note.title}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(note.updated_at * 1000).toLocaleDateString()}
              </div>
            </div>
          ))}
          {!isLoading && notes.length === 0 && (
            <div className="p-4 text-gray-400 text-sm text-center">
              No notes yet. Create your first note!
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
          {notes.length} notes
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-3xl font-bold">{selectedNote.title}</h2>
              <div className="text-sm text-gray-400 mt-2">
                Last updated: {new Date(selectedNote.updated_at * 1000).toLocaleString()}
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {selectedNote.content}
                </pre>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-xl mb-2">Select a note to view</p>
              <p className="text-sm">or create a new one to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
