import React, { useState } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors } from '../../utils/theme.js'

const Sidebar = ({ sidebarOpen, activeMenu, setActiveMenu }) => {
  const [expandedMenus, setExpandedMenus] = useState(['Academics'])

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const menuItems = [
    { id: 'Dashboard', icon: 'dashboard', label: 'Dashboard' },
    { 
      id: 'Academics', 
      icon: 'academics', 
      label: 'Academics', 
      hasArrow: true,
      submenu: [
        { id: 'Section', label: 'Section' },
        { id: 'Subject', label: 'Subject' },
        { id: 'Semester', label: 'Term' },
        { id: 'Class', label: 'Class' },
        { id: 'AssignClassSubject', label: 'Assign Class Subject' },
        { id: 'AssignClassTeacher', label: 'Assign Class Teacher' },
        { id: 'AssignSubjectTeacher', label: 'Assign Subject Teacher' },
        { id: 'AssignNewStudentClass', label: 'Assign New Student Class' },
        { id: 'PromoteStudent', label: 'Promote Student' }
      ]
    },
    { id: 'Exam', icon: 'exam', label: 'Exam', hasArrow: true },
    { id: 'Fees', icon: 'fees', label: 'Fees', hasArrow: true },
    { id: 'CustomFields', icon: 'settings', label: 'Custom Fields' },
    { 
      id: 'Students', 
      icon: 'students', 
      label: 'Students', 
      hasArrow: true,
      submenu: [
        { id: 'StudentsCategory', label: 'Students Category' },
        { id: 'StudentsAdmission', label: 'Students Admission' },
        { id: 'OnlineRegistrations', label: 'Online Registrations' },
        { id: 'AssignRollNumber', label: 'Assign Roll Number' },
        { id: 'StudentDetails', label: 'Student Details' },
        { id: 'GenerateIdCard', label: 'Generate Id Card' },
        { id: 'GenerateResult', label: 'Generate Result' },
        { id: 'StudentsResetPassword', label: 'Students Reset Password' },
        { id: 'AddBulkData', label: 'Add Bulk Data' }
      ]
    },
    { 
      id: 'Teacher', 
      icon: 'teacher', 
      label: 'Teacher', 
      hasArrow: true,
      submenu: [
        { id: 'AddNewTeacher', label: 'Add New Teacher' },
        { id: 'TeacherDetails', label: 'Teacher Details' }
      ]
    },
    { id: 'Parents', icon: 'parents', label: 'Parents' },
    { id: 'StaffManagement', icon: 'staff', label: 'Staff Management' },
    { id: 'Leave', icon: 'leave', label: 'Leave' },
    { id: 'Timetable', icon: 'timetable', label: 'Timetable' },
    { id: 'Attendance', icon: 'attendance', label: 'Attendance' },
    { id: 'StudentAssignment', icon: 'assignment', label: 'Student Assignment' },
    { id: 'CustomNotifications', icon: 'notifications', label: 'Custom Notifications' },
    { id: 'Announcement', icon: 'announcement', label: 'Announcement' },
    { id: 'Sliders', icon: 'sliders', label: 'Sliders' },
    { id: 'HolidayList', icon: 'holiday', label: 'Holiday List' },
    { id: 'Events', icon: 'events', label: 'Events' },
    { id: 'SessionYear', icon: 'session', label: 'Session Year' },
    { id: 'WebSettings', icon: 'web', label: 'Web Settings', hasArrow: true },
    { id: 'SystemSettings', icon: 'system', label: 'System Settings', hasArrow: true },
    { id: 'SystemUpdate', icon: 'update', label: 'System Update' }
  ]

  return (
    <div style={{
      width: sidebarOpen ? '280px' : '0px',
      backgroundColor: colors.background,
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      position: 'fixed',
      height: '100vh',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Fixed Header */}
      <div style={{ padding: '24px', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: colors.secondary,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <span style={{ fontSize: '20px', color: colors.textInverse }}>📚</span>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.textPrimary, margin: 0 }}>
            Shaheen Academy
          </h1>
        </div>
      </div>

      {/* Scrollable Menu Items */}
      <div className="sidebar-scroll" style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '0 24px 24px 24px'
      }}>
        <nav>
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Main Menu Item */}
              <div
                onClick={() => {
                  if (item.submenu) {
                    toggleMenu(item.id)
                  } else {
                    setActiveMenu(item.id)
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  marginBottom: '4px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: activeMenu === item.id ? colors.backgroundSecondary : 'transparent',
                  color: activeMenu === item.id ? colors.textPrimary : colors.textSecondary,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeMenu !== item.id) {
                    e.target.style.backgroundColor = colors.backgroundTertiary
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== item.id) {
                    e.target.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', color: activeMenu === item.id ? colors.secondary : colors.textSecondary }}>
                    {getIcon(item.icon)}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                </div>
                {item.hasArrow && (
                  <span style={{ 
                    fontSize: '12px', 
                    opacity: 0.7,
                    transform: expandedMenus.includes(item.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}>
                    ›
                  </span>
                )}
              </div>

              {/* Submenu Items */}
              {item.submenu && expandedMenus.includes(item.id) && (
                <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                  {item.submenu.map((subItem) => (
                    <div
                      key={subItem.id}
                      onClick={() => setActiveMenu(subItem.id)}
                      style={{
                        padding: '8px 16px',
                        marginBottom: '2px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        backgroundColor: activeMenu === subItem.id ? colors.secondary + '20' : 'transparent',
                        color: activeMenu === subItem.id ? colors.secondary : colors.textSecondary,
                        fontSize: '13px',
                        fontWeight: '400',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (activeMenu !== subItem.id) {
                          e.target.style.backgroundColor = colors.backgroundTertiary
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeMenu !== subItem.id) {
                          e.target.style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      {subItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
