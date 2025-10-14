import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: '🏠', hasArrow: false },
    { name: 'Academics', href: '/academics', icon: '🏢', hasArrow: true },
    { name: 'Custom Fields', href: '/custom-fields', icon: '📋', hasArrow: false },
    { name: 'Students', href: '/students', icon: '🎓', hasArrow: true },
    { name: 'Teachers', href: '/teachers', icon: '👨‍🏫', hasArrow: true },
    { name: 'Parents', href: '/parents', icon: '👨‍👩‍👧‍👦', hasArrow: false },
    { name: 'Staff Management', href: '/staff', icon: '💼', hasArrow: true },
    { name: 'Leave', href: '/leave', icon: '✈️', hasArrow: true },
    { name: 'Timetable', href: '/timetable', icon: '📅', hasArrow: true },
    { name: 'Attendance', href: '/attendance', icon: '✅', hasArrow: true },
    { name: 'Student Assignment', href: '/assignments', icon: '📄', hasArrow: true },
    { name: 'Exam', href: '/exam', icon: '📝', hasArrow: true },
    { name: 'Fees', href: '/fees', icon: '💰', hasArrow: true },
    { name: 'Custom Notifications', href: '/notifications', icon: '🔔', hasArrow: false },
    { name: 'Announcement', href: '/announcements', icon: '📢', hasArrow: false },
    { name: 'Sliders', href: '/sliders', icon: '🎚️', hasArrow: false },
    { name: 'Holiday List', href: '/holidays', icon: '📅', hasArrow: false },
    { name: 'Events', href: '/events', icon: '📋', hasArrow: false },
    { name: 'Session Year', href: '/session', icon: '📅', hasArrow: false },
    { name: 'Web Settings', href: '/web-settings', icon: '🔧', hasArrow: true },
    { name: 'System Settings', href: '/system-settings', icon: '⚙️', hasArrow: true },
    { name: 'System Update', href: '/system-update', icon: '☁️', hasArrow: false },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-0
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center mr-3">
              <span className="text-white text-sm">🎓</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">eSchool</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <span className="text-sm">☰</span>
            </button>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              3.3.3 v
            </div>
          </div>
        </div>
        
        <nav className="px-2 py-4 h-full overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center justify-between px-3 py-2 text-sm font-medium rounded transition-colors duration-200 group
                      ${isActive 
                        ? 'bg-green-100 text-green-800 border-l-4 border-green-600' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-base">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.hasArrow && (
                      <span className={`text-xs ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                        ◀
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
