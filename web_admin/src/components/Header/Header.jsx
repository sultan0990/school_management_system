import React from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors } from '../../utils/theme.js'

const Header = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  return (
    <header style={{
      backgroundColor: colors.background,
      padding: '16px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            color: colors.textSecondary,
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = colors.backgroundSecondary}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
          Dashboard
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: colors.backgroundSecondary,
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          color: colors.textSecondary,
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = colors.borderLight}
        onMouseLeave={(e) => e.target.style.backgroundColor = colors.backgroundSecondary}
        >
          Cache Clear
        </button>
        <div style={{ fontSize: '20px', cursor: 'pointer', color: colors.textSecondary }}>📅</div>
        <div style={{ fontSize: '20px', cursor: 'pointer', color: colors.textSecondary }}>🏢</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: colors.textPrimary }}>Super</span>
          <div style={{ fontSize: '20px', color: colors.textSecondary }}>👤</div>
          <button
            onClick={onLogout}
            style={{
              marginLeft: '8px',
              padding: '6px 12px',
              backgroundColor: colors.error,
              color: colors.textInverse,
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.error}
            onMouseLeave={(e) => e.target.style.backgroundColor = colors.error}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
