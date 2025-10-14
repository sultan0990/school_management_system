import React, { useState } from 'react'
import LoginPage from './components/Login/LoginPage'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import SectionPage from './components/Section/SectionPage'
import SubjectPage from './components/Subject/SubjectPage'
import SemesterPage from './components/Semester/SemesterPage'
import ClassPage from './components/Class/ClassPage'
import ClassSubjectPage from './components/ClassSubject/ClassSubjectPage'
import AssignClassTeacherPage from './components/AssignClassTeacher/AssignClassTeacherPage'
import AssignSubjectTeacherPage from './components/AssignSubjectTeacher/AssignSubjectTeacherPage'
import Fees from './pages/Fees'
import StudentsAdmission from './pages/StudentsAdmission'
import AddNewTeacher from './pages/AddNewTeacher'
import TeacherDetails from './pages/TeacherDetails'
import AddForm from './components/AddForm/AddForm'
import { colors } from './utils/theme.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [showAddForm, setShowAddForm] = useState(false)
  const [formType, setFormType] = useState('')
  
  // User data state
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [parents, setParents] = useState([])
  const [attendance, setAttendance] = useState([])
  const [leaves, setLeaves] = useState([])
  const [activities, setActivities] = useState([])

  const handleAddData = (type, data) => {
    const timestamp = new Date().toISOString()
    const activity = `${type} added: ${data.name || data.studentName || data.title}`
    
    switch (type) {
      case 'teacher':
        setTeachers(prev => [...prev, data])
        break
      case 'student':
        setStudents(prev => [...prev, data])
        break
      case 'parent':
        setParents(prev => [...prev, data])
        break
      case 'attendance':
        setAttendance(prev => [...prev, data])
        break
      case 'leave':
        setLeaves(prev => [...prev, data])
        break
      default:
        break
    }
    
    setActivities(prev => [{
      id: Date.now().toString(),
      action: activity,
      time: new Date(timestamp).toLocaleString()
    }, ...prev.slice(0, 9)])
  }

  const handleShowAddForm = (type) => {
    setFormType(type)
    setShowAddForm(true)
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={setIsLoggedIn} />
  }

  return (
    <>
      <style>
        {`
          .sidebar-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar-scroll::-webkit-scrollbar-track {
            background: ${colors.backgroundSecondary};
            border-radius: 3px;
          }
          .sidebar-scroll::-webkit-scrollbar-thumb {
            background: ${colors.border};
            border-radius: 3px;
          }
          .sidebar-scroll::-webkit-scrollbar-thumb:hover {
            background: ${colors.textSecondary};
          }
        `}
      </style>
      <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: colors.backgroundSecondary }}>
        {/* Sidebar */}
        <Sidebar 
          sidebarOpen={sidebarOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        {/* Main Content */}
        <div style={{
          flex: 1,
          marginLeft: sidebarOpen ? '280px' : '0px',
          transition: 'margin-left 0.3s ease',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <Header 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onLogout={() => setIsLoggedIn(false)}
          />

          {/* Main Content */}
          {activeMenu === 'Dashboard' && (
            <Dashboard 
              teachers={teachers}
              students={students}
              parents={parents}
              attendance={attendance}
              leaves={leaves}
              activities={activities}
              onShowAddForm={handleShowAddForm}
            />
          )}
          {activeMenu === 'Section' && <SectionPage />}
          {activeMenu === 'Subject' && <SubjectPage />}
          {activeMenu === 'Semester' && <SemesterPage />}
          {activeMenu === 'Class' && <ClassPage />}
          {activeMenu === 'AssignClassSubject' && <ClassSubjectPage />}
          {activeMenu === 'AssignClassTeacher' && <AssignClassTeacherPage />}
          {activeMenu === 'AssignSubjectTeacher' && <AssignSubjectTeacherPage />}
          {activeMenu === 'Fees' && <Fees />}
          {activeMenu === 'StudentsAdmission' && <StudentsAdmission />}
          {activeMenu === 'AddNewTeacher' && <AddNewTeacher />}
          {activeMenu === 'TeacherDetails' && <TeacherDetails />}
          {activeMenu !== 'Dashboard' && activeMenu !== 'Section' && activeMenu !== 'Subject' && activeMenu !== 'Semester' && activeMenu !== 'Class' && activeMenu !== 'AssignClassSubject' && activeMenu !== 'AssignClassTeacher' && activeMenu !== 'AssignSubjectTeacher' && activeMenu !== 'Fees' && activeMenu !== 'StudentsAdmission' && activeMenu !== 'AddNewTeacher' && activeMenu !== 'TeacherDetails' && (
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', color: colors.textSecondary }}>
                {activeMenu} Page Coming Soon
              </h2>
              <p style={{ fontSize: '16px', color: colors.textSecondary }}>
                This feature is under development.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer style={{
            backgroundColor: colors.backgroundSecondary,
            padding: '16px 24px',
            borderTop: `1px solid ${colors.borderLight}`,
            marginTop: 'auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>
                Copyright © 2025 eSchool - Virtual School Management System. All rights reserved.
              </p>
            </div>
          </footer>
        </div>

        {/* Add Form Modal */}
        <AddForm 
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          formType={formType}
          setFormType={setFormType}
          onAddData={handleAddData}
        />
      </div>
    </>
  )
}

export default App