import React, { useState, useEffect } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const AssignClassTeacherPage = () => {
  // Available teachers
  const [availableTeachers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@school.com', department: 'Mathematics' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@school.com', department: 'Science' },
    { id: 3, name: 'Michael Brown', email: 'michael.brown@school.com', department: 'English' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@school.com', department: 'History' },
    { id: 5, name: 'David Wilson', email: 'david.wilson@school.com', department: 'Computer Science' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@school.com', department: 'Art' },
    { id: 7, name: 'Robert Taylor', email: 'robert.taylor@school.com', department: 'Physical Education' },
    { id: 8, name: 'Jennifer Martinez', email: 'jennifer.martinez@school.com', department: 'Music' }
  ])

  // Available subjects from Subject page
  const [availableSubjects] = useState([
    { id: 1, name: 'Maths', type: 'Practical' },
    { id: 2, name: 'Science', type: 'Practical' },
    { id: 3, name: 'English', type: 'Theory' },
    { id: 4, name: 'Account', type: 'Theory' },
    { id: 5, name: 'Music', type: 'Practical' },
    { id: 6, name: 'Drawing', type: 'Practical' },
    { id: 7, name: 'Hindi', type: 'Theory' },
    { id: 8, name: 'Computer', type: 'Practical' },
    { id: 9, name: 'Chemistry', type: 'Theory' }
  ])

  // Available sections
  const [availableSections] = useState(['A', 'B', 'C', 'D'])

  const [classTeachers, setClassTeachers] = useState([
    { 
      id: 1, 
      teacherId: 1,
      teacherName: 'John Smith',
      subjectId: 1,
      subjectName: 'Maths',
      classId: 1,
      className: '10',
      section: 'A',
      createdAt: '13-06-2022 17:04:00',
      updatedAt: '13-06-2022 17:04:00'
    },
    { 
      id: 2, 
      teacherId: 2,
      teacherName: 'Sarah Johnson',
      subjectId: 2,
      subjectName: 'Science',
      classId: 2,
      className: '8',
      section: 'B',
      createdAt: '13-06-2022 17:03:44',
      updatedAt: '13-06-2022 17:03:44'
    },
    { 
      id: 3, 
      teacherId: 3,
      teacherName: 'Michael Brown',
      subjectId: 3,
      subjectName: 'English',
      classId: 3,
      className: '9',
      section: 'A',
      createdAt: '13-06-2022 17:02:39',
      updatedAt: '22-08-2023 09:42:18'
    }
  ])

  const [newClassTeacher, setNewClassTeacher] = useState({
    teacherName: '',
    subjectId: '',
    classId: '',
    section: ''
  })

  const [editingClassTeacher, setEditingClassTeacher] = useState(null)
  const [editData, setEditData] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    no: true,
    teacherId: true,
    teacherName: true,
    subjectName: true,
    className: true,
    section: true,
    createdAt: true,
    updatedAt: true,
    action: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newClassTeacher.teacherName && newClassTeacher.subjectId && newClassTeacher.classId && newClassTeacher.section) {
      const newId = Math.max(...classTeachers.map(ct => ct.id)) + 1
      const newTeacherId = Math.max(...classTeachers.map(ct => ct.teacherId)) + 1
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      
      const selectedSubject = availableSubjects.find(s => s.id === parseInt(newClassTeacher.subjectId))
      const selectedClass = availableClasses.find(c => c.id === parseInt(newClassTeacher.classId))
      
      setClassTeachers([...classTeachers, {
        id: newId,
        teacherId: newTeacherId,
        teacherName: newClassTeacher.teacherName,
        subjectId: parseInt(newClassTeacher.subjectId),
        subjectName: selectedSubject.name,
        classId: parseInt(newClassTeacher.classId),
        className: selectedClass.name,
        section: newClassTeacher.section,
        createdAt: timestamp,
        updatedAt: timestamp
      }])
      setNewClassTeacher({
        teacherName: '',
        subjectId: '',
        classId: '',
        section: ''
      })
    }
  }

  const handleEdit = (classTeacher) => {
    setEditingClassTeacher(classTeacher)
    setEditData({
      teacherName: classTeacher.teacherName,
      subjectId: classTeacher.subjectId,
      classId: classTeacher.classId,
      section: classTeacher.section
    })
  }

  const handleUpdate = () => {
    if (editData.teacherName && editData.subjectId && editData.classId && editData.section) {
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      
      const selectedSubject = availableSubjects.find(s => s.id === editData.subjectId)
      const selectedClass = availableClasses.find(c => c.id === editData.classId)
      
      setClassTeachers(classTeachers.map(ct =>
        ct.id === editingClassTeacher.id
          ? { 
              ...ct, 
              teacherName: editData.teacherName,
              subjectId: editData.subjectId,
              subjectName: selectedSubject.name,
              classId: editData.classId,
              className: selectedClass.name,
              section: editData.section,
              updatedAt: timestamp 
            }
          : ct
      ))
      setEditingClassTeacher(null)
      setEditData({})
    }
  }

  const handleDelete = (classTeacherId) => {
    setClassTeachers(classTeachers.filter(ct => ct.id !== classTeacherId))
    setShowDeleteModal(null)
  }

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }))
  }

  const filteredClassTeachers = classTeachers.filter(classTeacher =>
    classTeacher.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classTeacher.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classTeacher.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classTeacher.section.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDownloadDropdown && !event.target.closest('[data-dropdown="download"]')) {
        setShowDownloadDropdown(false)
      }
      if (showColumnDropdown && !event.target.closest('[data-dropdown="column"]')) {
        setShowColumnDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDownloadDropdown, showColumnDropdown])

  return (
    <main style={{ padding: '24px' }}>
      {/* Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '20px', marginRight: '12px', color: colors.secondary }}>
          {getIcon('academics')}
        </span>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.textPrimary, margin: 0 }}>
          Assign Class Teacher
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '1200px'
      }}>
        {/* Create Class Teacher Assignment Panel */}
        <div style={{
          ...commonStyles.card.base,
          height: 'fit-content'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            Create Class Teacher Assignment
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Teacher Name <span style={{ color: colors.error }}>*</span>
                </label>
                <input
                  type="text"
                  value={newClassTeacher.teacherName}
                  onChange={(e) => setNewClassTeacher({...newClassTeacher, teacherName: e.target.value})}
                  required
                  placeholder="Enter teacher name"
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Subject <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={newClassTeacher.subjectId}
                  onChange={(e) => setNewClassTeacher({...newClassTeacher, subjectId: e.target.value})}
                  required
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} - {subject.type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Class <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={newClassTeacher.classId}
                  onChange={(e) => setNewClassTeacher({...newClassTeacher, classId: e.target.value})}
                  required
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableClasses.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Section <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={newClassTeacher.section}
                  onChange={(e) => setNewClassTeacher({...newClassTeacher, section: e.target.value})}
                  required
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableSections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...commonStyles.button.primary,
                width: '100%'
              }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* List Class Teacher Assignment Panel */}
        <div style={commonStyles.card.base}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            List Class Teacher Assignment
          </h2>

          {/* Search and Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ position: 'relative', flex: 1, marginRight: '16px' }}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...commonStyles.input.base,
                  padding: '10px 16px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
              <button style={{
                padding: '8px',
                backgroundColor: colors.backgroundSecondary,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                color: colors.textSecondary
              }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </button>

              {/* Column Visibility Dropdown */}
              <div style={{ position: 'relative' }} data-dropdown="column">
                <button
                  onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                  style={{
                    padding: '8px',
                    backgroundColor: showColumnDropdown ? colors.borderLight : colors.backgroundSecondary,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: colors.textSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                  </svg>
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>

                {showColumnDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.borderLight}`,
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    minWidth: '140px',
                    marginTop: '4px',
                    padding: '8px 0',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    <div style={{ padding: '4px 12px', fontSize: '12px', color: colors.textSecondary, fontWeight: '500' }}>
                      Column Visibility
                    </div>
                    <div style={{ borderTop: `1px solid ${colors.borderLight}`, margin: '4px 0' }}></div>
                    {[
                      { key: 'id', label: 'Id' },
                      { key: 'no', label: 'No.' },
                      { key: 'teacherId', label: 'Teacher ID' },
                      { key: 'teacherName', label: 'Teacher Name' },
                      { key: 'subjectName', label: 'Subject Name' },
                      { key: 'className', label: 'Class Name' },
                      { key: 'section', label: 'Section' },
                      { key: 'createdAt', label: 'Created At' },
                      { key: 'updatedAt', label: 'Updated At' },
                      { key: 'action', label: 'Action' }
                    ].map((column) => (
                      <label key={column.key} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: colors.textSecondary
                      }}>
                        <input
                          type="checkbox"
                          checked={visibleColumns[column.key]}
                          onChange={() => toggleColumnVisibility(column.key)}
                          style={{
                            marginRight: '8px',
                            accentColor: colors.primary
                          }}
                        />
                        {column.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Download Dropdown */}
              <div style={{ position: 'relative' }} data-dropdown="download">
                <button
                  onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                  style={{
                    padding: '8px',
                    backgroundColor: colors.backgroundSecondary,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: colors.textSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>

                {showDownloadDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.borderLight}`,
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    minWidth: '120px',
                    marginTop: '4px'
                  }}>
                    {['CSV', 'MS-Excel', 'PDF', 'TXT', 'JSON'].map((format) => (
                      <button key={format} style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: colors.textSecondary
                      }}>
                        {format}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table with Scrollable Container */}
          <div style={{ 
            overflowX: 'auto',
            maxHeight: '500px',
            overflowY: 'auto',
            border: `1px solid ${colors.borderLight}`,
            borderRadius: '8px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, backgroundColor: colors.background, zIndex: 10 }}>
                <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                  {visibleColumns.id && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Id
                    </th>
                  )}
                  {visibleColumns.no && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      No.
                    </th>
                  )}
                  {visibleColumns.teacherId && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Teacher ID
                    </th>
                  )}
                  {visibleColumns.teacherName && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Teacher Name
                    </th>
                  )}
                  {visibleColumns.subjectName && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Subject Name
                    </th>
                  )}
                  {visibleColumns.className && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Class Name
                    </th>
                  )}
                  {visibleColumns.section && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Section
                    </th>
                  )}
                  {visibleColumns.createdAt && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Created At
                    </th>
                  )}
                  {visibleColumns.updatedAt && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Updated At
                    </th>
                  )}
                  {visibleColumns.action && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredClassTeachers.map((classTeacher, index) => (
                  <tr key={classTeacher.id} style={{ borderBottom: `1px solid ${colors.backgroundSecondary}` }}>
                    {visibleColumns.id && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.id}
                      </td>
                    )}
                    {visibleColumns.no && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {index + 1}
                      </td>
                    )}
                    {visibleColumns.teacherId && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.teacherId}
                      </td>
                    )}
                    {visibleColumns.teacherName && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.teacherName}
                      </td>
                    )}
                    {visibleColumns.subjectName && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.subjectName}
                      </td>
                    )}
                    {visibleColumns.className && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.className}
                      </td>
                    )}
                    {visibleColumns.section && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.section}
                      </td>
                    )}
                    {visibleColumns.createdAt && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.createdAt}
                      </td>
                    )}
                    {visibleColumns.updatedAt && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classTeacher.updatedAt}
                      </td>
                    )}
                    {visibleColumns.action && (
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(classTeacher)}
                            style={{
                              padding: '8px',
                              backgroundColor: colors.accent,
                              border: 'none',
                              borderRadius: '50%',
                              cursor: 'pointer',
                              color: colors.textInverse,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(classTeacher)}
                            style={{
                              padding: '8px',
                              backgroundColor: colors.warning,
                              border: 'none',
                              borderRadius: '50%',
                              cursor: 'pointer',
                              color: colors.textInverse,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div style={{
            marginTop: '16px',
            fontSize: '14px',
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            Showing 1 to {filteredClassTeachers.length} of {classTeachers.length} rows
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingClassTeacher && (
        <div style={commonStyles.modal.overlay}>
          <div style={{
            ...commonStyles.modal.content,
            width: '90%',
            maxWidth: '600px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                Edit Class Teacher Assignment
              </h3>
              <button
                onClick={() => {
                  setEditingClassTeacher(null)
                  setEditData({})
                }}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: colors.textSecondary,
                  fontSize: '20px'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Teacher Name <span style={{ color: colors.error }}>*</span>
                </label>
                <input
                  type="text"
                  value={editData.teacherName || ''}
                  onChange={(e) => setEditData({...editData, teacherName: e.target.value})}
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Subject <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={editData.subjectId || ''}
                  onChange={(e) => setEditData({...editData, subjectId: parseInt(e.target.value)})}
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} - {subject.type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Class <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={editData.classId || ''}
                  onChange={(e) => setEditData({...editData, classId: parseInt(e.target.value)})}
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableClasses.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  Section <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={editData.section || ''}
                  onChange={(e) => setEditData({...editData, section: e.target.value})}
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableSections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setEditingClassTeacher(null)
                  setEditData({})
                }}
                style={{
                  ...commonStyles.button.outline,
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Close
              </button>
              <button
                onClick={handleUpdate}
                style={{
                  ...commonStyles.button.primary,
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={commonStyles.modal.overlay}>
          <div style={{
            ...commonStyles.modal.content,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', color: colors.warning, marginBottom: '16px' }}>
              ⚠️
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 8px 0' }}>
              Are you sure?
            </h3>
            <p style={{ fontSize: '16px', color: colors.textSecondary, margin: '0 0 24px 0' }}>
              You won't be able to revert this!
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteModal(null)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: colors.error,
                  color: colors.textInverse,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal.id)}
                style={{
                  ...commonStyles.button.primary,
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Yes, delete it!
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default AssignClassTeacherPage
