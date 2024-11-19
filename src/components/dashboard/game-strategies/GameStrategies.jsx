import React from 'react'

const GameStrategies = () => {
  const handleDownload = () => {
    // Add download functionality here
    alert("Download started...");
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Game Strategies</h1>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="bi bi-download"></i>
          <span>Download Strategies</span>
        </button>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Coming soon....</p>
      </div>
    </div>
  )
}

export default GameStrategies