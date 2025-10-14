import React from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const Dashboard = ({ 
  teachers, 
  students, 
  parents, 
  attendance, 
  leaves, 
  activities,
  onShowAddForm 
}) => {
  // Calculate attendance percentages
  const getAttendanceStats = () => {
    if (attendance.length === 0) return { present: 0, absent: 0 }
    const present = attendance.filter(a => a.status === 'Present').length
    const absent = attendance.filter(a => a.status === 'Absent').length
    const total = attendance.length
    return {
      present: total > 0 ? Math.round((present / total) * 100) : 0,
      absent: total > 0 ? Math.round((absent / total) * 100) : 0
    }
  }

  const attendanceStats = getAttendanceStats()

  const quickActions = [
    { type: 'teacher', label: 'Add Teacher', color: colors.error, icon: 'teacher' },
    { type: 'student', label: 'Add Student', color: colors.accent, icon: 'students' },
    { type: 'parent', label: 'Add Parent', color: colors.primary, icon: 'parents' },
    { type: 'attendance', label: 'Mark Attendance', color: colors.secondary, icon: 'attendance' },
    { type: 'leave', label: 'Add Leave', color: colors.warning, icon: 'leave' }
  ]

  return (
    <main style={{ padding: '24px' }}>
      {/* Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '20px', marginRight: '12px', color: colors.secondary }}>
          {getIcon('dashboard')}
        </span>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.textPrimary, margin: 0 }}>
          Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Teachers Card */}
        <div style={{
          background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
          borderRadius: '16px',
          padding: '24px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', color: 'white' }}>
                {getIcon('teacher')}
              </span>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                position: 'absolute',
                top: '-20px',
                right: '-20px'
              }}></div>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0', opacity: 0.9 }}>
              Total Teachers
            </h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
              {teachers.length}
            </p>
          </div>
        </div>

        {/* Students Card */}
        <div style={{
          background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
          borderRadius: '16px',
          padding: '24px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', color: 'white' }}>
                {getIcon('students')}
              </span>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                position: 'absolute',
                top: '-20px',
                right: '-20px'
              }}></div>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0', opacity: 0.9 }}>
              Total Students
            </h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
              {students.length}
            </p>
          </div>
        </div>

        {/* Parents Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '16px',
          padding: '24px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', color: 'white' }}>
                {getIcon('parents')}
              </span>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                position: 'absolute',
                top: '-20px',
                right: '-20px'
              }}></div>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0', opacity: 0.9 }}>
              Total Parents
            </h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
              {parents.length}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={commonStyles.card.base}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 16px 0' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {quickActions.map((action) => (
            <button
              key={action.type}
              onClick={() => onShowAddForm(action.type)}
              style={{
                padding: '12px 20px',
                backgroundColor: action.color,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '16px' }}>
                {getIcon(action.icon)}
              </span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Charts and Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Attendance Chart */}
        <div style={commonStyles.card.base}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 16px 0' }}>
            Attendance Overview
          </h3>
          {attendance.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: colors.textSecondary }}>
              <div style={{ fontSize: '32px', marginBottom: '8px', color: colors.borderLight }}>
                {getIcon('attendance')}
              </div>
              <p style={{ fontSize: '14px' }}>No attendance data available</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.secondary }}>
                    {attendanceStats.present}%
                  </div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>Present</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.error }}>
                    {attendanceStats.absent}%
                  </div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>Absent</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${attendanceStats.present}%`, 
                  backgroundColor: colors.secondary 
                }}></div>
                <div style={{ 
                  width: `${attendanceStats.absent}%`, 
                  backgroundColor: colors.error 
                }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div style={commonStyles.card.base}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 16px 0' }}>
            Recent Activity
          </h3>
          {activities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: colors.textSecondary }}>
              <div style={{ fontSize: '32px', marginBottom: '8px', color: colors.borderLight }}>
                {getIcon('assignment')}
              </div>
              <p style={{ fontSize: '14px' }}>No recent activity</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.map((activity) => (
                <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px', color: colors.secondary }}>
                    {getIcon('assignment')}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: colors.textPrimary, margin: '0 0 2px 0' }}>{activity.action}</p>
                    <p style={{ fontSize: '12px', color: colors.textSecondary, margin: 0 }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Status */}
        <div style={commonStyles.card.base}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 16px 0' }}>
            System Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { status: 'Server', statusText: 'Online', color: colors.secondary, icon: 'dashboard' },
              { status: 'Database', statusText: 'Connected', color: colors.secondary, icon: 'settings' },
              { status: 'Backup', statusText: 'Scheduled', color: colors.warning, icon: 'leave' }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: item.color }}>
                    {getIcon(item.icon)}
                  </span>
                  <span style={{ fontSize: '14px', color: colors.textPrimary }}>{item.status}</span>
                </div>
                <span style={{ fontSize: '12px', color: item.color, fontWeight: '500' }}>{item.statusText}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Dashboard Sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginTop: '32px'
      }}>
        {/* Student/Staff List */}
        <div style={{
          ...commonStyles.card.base,
          maxHeight: '400px',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
              S - A Gujral Science
            </h3>
            <span style={{ fontSize: '14px', color: colors.textSecondary }}>Divy Jani</span>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {students.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: colors.textSecondary }}>
                <div style={{ fontSize: '32px', marginBottom: '8px', color: colors.borderLight }}>
                  {getIcon('students')}
                </div>
                <p style={{ fontSize: '14px' }}>No students added yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {students.map((student) => (
                  <div key={student.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: colors.backgroundTertiary
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: colors.borderLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: colors.textSecondary
                    }}>
                      {student.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: colors.textPrimary, margin: '0 0 2px 0' }}>
                        {student.name}
                      </p>
                      <p style={{ fontSize: '12px', color: colors.textSecondary, margin: 0 }}>
                        {student.grade}
                      </p>
                    </div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: colors.secondary
                    }}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Gender Distribution Chart */}
        <div style={commonStyles.card.base}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 16px 0' }}>
            Gender Distribution
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              {/* Donut Chart */}
              <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={colors.borderLight}
                  strokeWidth="20"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 50 * 0.8462} ${2 * Math.PI * 50}`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 50 * 0.1538} ${2 * Math.PI * 50}`}
                  strokeDashoffset={`-${2 * Math.PI * 50 * 0.8462}`}
                />
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: colors.primary
              }}></div>
              <span style={{ fontSize: '14px', color: colors.textPrimary }}>Boys: 84.62%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: colors.accent
              }}></div>
              <span style={{ fontSize: '14px', color: colors.textPrimary }}>Girls: 15.38%</span>
            </div>
          </div>
        </div>

        {/* Noticeboard */}
        <div style={{
          ...commonStyles.card.base,
          gridColumn: 'span 2'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 16px 0' }}>
            Noticeboard
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: colors.textSecondary }}>No.</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: colors.textSecondary }}>Title</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: colors.textSecondary }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: colors.textSecondary }}>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: colors.textSecondary, fontSize: '14px' }}>
                    No notices available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
