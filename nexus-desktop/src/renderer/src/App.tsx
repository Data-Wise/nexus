import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full bg-nexus-bg-primary text-nexus-text-primary flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          Nexus
        </h1>
        <p className="text-xl mb-8 text-gray-400">
          Connect Everything You Know
        </p>
        <div className="bg-nexus-bg-secondary p-8 rounded-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-nexus-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Count is {count}
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Click the button to test React state management
          </p>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Sprint 1: Hello World ✓
        </p>
      </div>
    </div>
  )
}

export default App
