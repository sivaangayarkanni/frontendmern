import { useState } from 'react'
import './App.css'

function App() {
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [won, setWon] = useState(false)

  const handleGuess = () => {
    const num = parseInt(guess)
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a number between 1 and 100')
      return
    }
    
    setAttempts(attempts + 1)
    
    if (num === target) {
      setMessage('🎉 Congratulations! You guessed it!')
      setWon(true)
    } else if (num < target) {
      setMessage('📈 Too Low! Try a higher number')
    } else {
      setMessage('📉 Too High! Try a lower number')
    }
    setGuess('')
  }

  const reset = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full transform transition-all hover:scale-105">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Guess the Number
        </h1>
        <p className="text-center text-gray-600 mb-6">Between 1 and 100</p>
        
        <div className="mb-6">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !won && handleGuess()}
            disabled={won}
            className="w-full px-4 py-3 text-lg border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 transition-colors disabled:bg-gray-100"
            placeholder="Enter your guess"
          />
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-center font-semibold text-lg transition-all ${
            won ? 'bg-green-100 text-green-700 animate-bounce' : 
            message.includes('Low') ? 'bg-blue-100 text-blue-700' : 
            message.includes('High') ? 'bg-orange-100 text-orange-700' : 
            'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-gray-600">Attempts: <span className="font-bold text-purple-600">{attempts}</span></p>
        </div>

        {!won ? (
          <button
            onClick={handleGuess}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform transition-all hover:scale-105 active:scale-95"
          >
            Submit Guess
          </button>
        ) : (
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transform transition-all hover:scale-105 active:scale-95"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  )
}

export default App
