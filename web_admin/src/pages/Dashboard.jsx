import React from 'react'

const Dashboard = () => {
  const stats = [
    { 
      name: 'Total Teachers', 
      value: '9', 
      change: '+2 this month', 
      changeType: 'positive',
      icon: '👨‍🏫',
      gradient: 'from-orange-400 to-pink-500',
      bgPattern: 'bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1),transparent_50%)]'
    },
    { 
      name: 'Total Students', 
      value: '13', 
      change: '+5 this month', 
      changeType: 'positive',
      icon: '🎓',
      gradient: 'from-blue-400 to-cyan-500',
      bgPattern: 'bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]'
    },
    { 
      name: 'Total Parents', 
      value: '22', 
      change: '+3 this month', 
      changeType: 'positive',
      icon: '👨‍👩‍👧',
      gradient: 'from-teal-400 to-green-500',
      bgPattern: 'bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.1),transparent_50%)]'
    }
  ]

  const teachers = [
    { name: 'Sarah Johnson', subject: 'Mathematics', status: 'online', avatar: '👩‍🏫' },
    { name: 'Michael Chen', subject: 'Science', status: 'online', avatar: '👨‍🔬' },
    { name: 'Emily Davis', subject: 'English', status: 'offline', avatar: '👩‍💼' },
    { name: 'David Wilson', subject: 'History', status: 'online', avatar: '👨‍🏫' },
    { name: 'Lisa Brown', subject: 'Art', status: 'online', avatar: '👩‍🎨' }
  ]

  const topRankers = [
    { name: 'Alice Smith', class: '10-A', score: '98%', rank: '1', medal: '🥇' },
    { name: 'Bob Johnson', class: '9-B', score: '96%', rank: '2', medal: '🥈' },
    { name: 'Carol Davis', class: '11-A', score: '94%', rank: '3', medal: '🥉' }
  ]

  const attendanceData = [
    { class: '9 - A Gujrati Science', percentage: 50, present: 15, students: 30 },
    { class: '10 - A Gujrati', percentage: 70, present: 21, students: 30 }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className={`absolute inset-0 ${stat.bgPattern}`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">↗</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance</h3>
          <div className="space-y-4">
            {attendanceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.class}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
                    <p className="text-xs text-gray-500">{item.present}/{item.students} students</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      index === 0 ? 'bg-gradient-to-r from-pink-400 to-rose-500' :
                      'bg-gradient-to-r from-blue-400 to-cyan-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaves Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Leaves</h3>
            <select className="text-sm border border-gray-300 rounded px-2 py-1">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">No.</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Image</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Name</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No leave records found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard