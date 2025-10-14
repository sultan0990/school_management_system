import React, { useState } from 'react'
import { colors, commonStyles } from '../../utils/theme.js'

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple login validation - in real app, this would check against a database
    if (formData.email && formData.password) {
      onLogin(true)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDemoLogin = (type) => {
    if (type === 'admin') {
      setFormData({ email: 'admin@shaheenacademy.com', password: 'admin123' })
      onLogin(true)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Side - Educational Background */}
      <div style={{ 
        width: '50%', 
        backgroundColor: colors.secondary, 
        position: 'relative', 
        overflow: 'hidden',
        display: window.innerWidth < 1024 ? 'none' : 'block'
      }}>
        {/* Educational Doodles */}
        <div style={{ position: 'absolute', inset: 0, color: 'white', opacity: 0.8 }}>
          {/* Graduation Cap */}
          <div style={{ position: 'absolute', top: '64px', left: '64px', width: '32px', height: '32px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          
          {/* Paper Airplane */}
          <div style={{ position: 'absolute', top: '128px', left: '128px', width: '24px', height: '24px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </div>
          
          {/* Sun */}
          <div style={{ position: 'absolute', top: '80px', right: '80px', width: '40px', height: '40px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </div>
          
          {/* Cloud */}
          <div style={{ position: 'absolute', top: '160px', right: '128px', width: '32px', height: '24px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
          </div>
          
          {/* Laptop */}
          <div style={{ position: 'absolute', bottom: '128px', left: '80px', width: '48px', height: '32px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <path d="M6 21h12"/>
            </svg>
          </div>
          
          {/* Backpack */}
          <div style={{ position: 'absolute', bottom: '80px', left: '128px', width: '32px', height: '40px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
              <path d="M4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/>
              <path d="M16 9V7a4 4 0 0 0-8 0v2"/>
              <path d="M8 9h8"/>
            </svg>
          </div>
          
          {/* Pear */}
          <div style={{ position: 'absolute', bottom: '64px', left: '64px', width: '24px', height: '32px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
              <path d="M12 2c-2 0-4 1-4 3 0 1 0 2 1 3-1 1-2 2-2 4 0 2 2 4 4 4s4-2 4-4c0-2-1-3-2-4 1-1 1-2 1-3 0-2-2-3-4-3z"/>
            </svg>
          </div>
          
          {/* Squiggles */}
          <div style={{ position: 'absolute', top: '240px', left: '160px', width: '64px', height: '16px' }}>
            <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '100%', height: '100%' }}>
              <path d="M10,10 Q30,5 50,10 T90,10"/>
            </svg>
          </div>
          
          <div style={{ position: 'absolute', top: '320px', right: '64px', width: '48px', height: '12px' }}>
            <svg viewBox="0 0 80 15" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '100%', height: '100%' }}>
              <path d="M5,8 Q20,3 40,8 T75,8"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Right Side - Login Panel */}
      <div style={{ 
        width: window.innerWidth < 1024 ? '100%' : '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '32px',
        backgroundColor: colors.backgroundSecondary
      }}>
        <div style={{ 
          ...commonStyles.card.base,
          width: '100%', 
          maxWidth: '400px', 
          padding: '32px'
        }}>
          {/* NOTE Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              backgroundColor: colors.primary + '20', 
              borderRadius: '8px', 
              padding: '12px', 
              textAlign: 'center'
            }}>
              <span style={{ color: colors.primary, fontSize: '14px' }}>
                NOTE: <a href="#" style={{ color: colors.primary, textDecoration: 'underline' }}>Click Here</a> -- If you Can't Login.
              </span>
            </div>
          </div>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              padding: '8px'
            }}>
              <img 
                src="/images/Shaheen Academy Log.png" 
                alt="Shaheen Academy Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            </div>
            <img 
              src="/images/Shaheen Academy Name Logo.png" 
              alt="Shaheen Academy" 
              style={{ 
                maxWidth: '200px', 
                height: 'auto',
                margin: '0 auto',
                display: 'block'
              }} 
            />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.textSecondary, marginBottom: '8px' }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                style={commonStyles.input.base}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onFocus={(e) => e.target.style.borderColor = colors.borderFocus}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.textSecondary, marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password"
                  type="password"
                  required
                  style={{
                    ...commonStyles.input.base,
                    padding: '12px 48px 12px 16px'
                  }}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = colors.borderFocus}
                  onBlur={(e) => e.target.style.borderColor = colors.border}
                />
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: colors.textSecondary,
                    cursor: 'pointer'
                  }}
                >
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              <a href="#" style={{ fontSize: '14px', color: colors.textSecondary, textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              style={{
                ...commonStyles.button.primary,
                width: '100%',
                backgroundColor: colors.secondary
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.secondary}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.secondary}
            >
              Login
            </button>
          </form>

          {/* Demo Credentials Section */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span style={{ color: colors.textSecondary, fontSize: '14px', fontWeight: '500' }}>Demo Credentials</span>
            </div>
            
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              style={{
                ...commonStyles.button.secondary,
                width: '100%'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.secondary}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.secondary}
            >
              Super Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
