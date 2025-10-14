import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just log in with any credentials
    onLogin()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Educational Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-teal-600">
        {/* Educational Doodles */}
        <div className="absolute inset-0 text-white opacity-80">
          {/* Graduation Cap */}
          <div className="absolute top-16 left-16 w-8 h-8">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          
          {/* Paper Airplane */}
          <div className="absolute top-32 left-32 w-6 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </div>
          
          {/* Sun */}
          <div className="absolute top-20 right-20 w-10 h-10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </div>
          
          {/* Cloud */}
          <div className="absolute top-40 right-32 w-8 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
          </div>
          
          {/* Laptop */}
          <div className="absolute bottom-32 left-20 w-12 h-8">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <path d="M6 21h12"/>
            </svg>
          </div>
          
          {/* Backpack */}
          <div className="absolute bottom-20 left-32 w-8 h-10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/>
              <path d="M16 9V7a4 4 0 0 0-8 0v2"/>
              <path d="M8 9h8"/>
            </svg>
          </div>
          
          {/* Pear */}
          <div className="absolute bottom-16 left-16 w-6 h-8">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2c-2 0-4 1-4 3 0 1 0 2 1 3-1 1-2 2-2 4 0 2 2 4 4 4s4-2 4-4c0-2-1-3-2-4 1-1 1-2 1-3 0-2-2-3-4-3z"/>
            </svg>
          </div>
          
          {/* Squiggles */}
          <div className="absolute top-60 left-40 w-16 h-4">
            <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
              <path d="M10,10 Q30,5 50,10 T90,10"/>
            </svg>
          </div>
          
          <div className="absolute top-80 right-16 w-12 h-3">
            <svg viewBox="0 0 80 15" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
              <path d="M5,8 Q20,3 40,8 T75,8"/>
            </svg>
          </div>
        </div>

        {/* Student Image Placeholder */}
        <div className="absolute bottom-0 left-0 w-64 h-80 flex items-end justify-center">
          <div className="w-48 h-64 bg-white bg-opacity-10 rounded-t-full flex items-end justify-center">
            <div className="w-32 h-40 bg-white bg-opacity-20 rounded-t-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* NOTE Section */}
          <div className="mb-6">
            <div className="bg-blue-100 rounded-lg p-3 text-center">
              <span className="text-blue-800 text-sm">
                NOTE: <a href="#" className="text-blue-600 hover:text-blue-800 underline">Click Here</a> -- If you Can't Login.
              </span>
            </div>
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-green-500">e</span><span className="text-blue-800">School</span>
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12 transition duration-200"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition duration-200">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200 font-semibold"
            >
              Login
            </button>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="text-gray-600 text-sm font-medium">Demo Credentials</span>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({ email: 'admin@eschool.com', password: 'admin123' })
                }}
                className="flex-1 bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200 font-semibold"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({ email: 'teacher@eschool.com', password: 'teacher123' })
                }}
                className="flex-1 bg-pink-400 text-white py-3 px-4 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition duration-200 font-semibold"
              >
                Teacher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
