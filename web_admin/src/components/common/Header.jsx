import { useState } from 'react'

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden transition-colors"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center ml-4">
            <span className="text-lg mr-2">🏠</span>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Cache Clear Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
            Cache Clear
          </button>
          
          {/* Document Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-lg">📄</span>
          </button>
          
          {/* School Building Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-lg">🎓</span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Super</span>
            <span className="text-gray-400">▲</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
