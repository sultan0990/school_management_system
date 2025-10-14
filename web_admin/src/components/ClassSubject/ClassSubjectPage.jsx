import React, { useState, useEffect } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const ClassSubjectPage = () => {
  // Available classes from Class page
  const [availableClasses] = useState([
    { id: 1, name: '10', section: 'A' },
    { id: 2, name: '8', section: 'B' },
    { id: 3, name: '9', section: 'A' }
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

  const [classSubjects, setClassSubjects] = useState([
    { 
      id: 1, 
      classId: 1,
      className: '10',
      section: 'A,B',
      includeSemesters: false,
      coreSubjects: [
        { id: 1, name: 'Maths', type: 'Practical' },
        { id: 2, name: 'Science', type: 'Practical' },
        { id: 3, name: 'Account', type: 'Theory' },
        { id: 4, name: 'English', type: 'Theory' }
      ],
      createdAt: '13-06-2022 17:04:00',
      updatedAt: '13-06-2022 17:04:00'
    },
    { 
      id: 2, 
      classId: 2,
      className: '8',
      section: 'A,B',
      includeSemesters: false,
      coreSubjects: [
        { id: 2, name: 'Science', type: 'Practical' },
        { id: 1, name: 'Maths', type: 'Practical' },
        { id: 3, name: 'Account', type: 'Theory' },
        { id: 5, name: 'Music', type: 'Practical' },
        { id: 6, name: 'Drawing', type: 'Practical' },
        { id: 4, name: 'English', type: 'Theory' }
      ],
      createdAt: '13-06-2022 17:03:44',
      updatedAt: '13-06-2022 17:03:44'
    },
    { 
      id: 3, 
      classId: 3,
      className: '9',
      section: 'A,B',
      includeSemesters: false,
      coreSubjects: [
        { id: 1, name: 'Maths', type: 'Practical' },
        { id: 2, name: 'Science', type: 'Practical' },
        { id: 4, name: 'English', type: 'Theory' },
        { id: 3, name: 'Account', type: 'Theory' },
        { id: 7, name: 'Hindi', type: 'Theory' },
        { id: 5, name: 'Music', type: 'Practical' },
        { id: 2, name: 'Science', type: 'Theory' }
      ],
      createdAt: '13-06-2022 17:02:39',
      updatedAt: '22-08-2023 09:42:18'
    }
  ])

  const [newClassSubject, setNewClassSubject] = useState({
    classId: '',
    includeSemesters: false,
    coreSubjects: []
  })

  const [editingClassSubject, setEditingClassSubject] = useState(null)
  const [editData, setEditData] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    no: true,
    name: true,
    section: true,
    semester: true,
    coreSubjects: true,
    createdAt: true,
    updatedAt: true,
    action: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newClassSubject.classId && newClassSubject.coreSubjects.length > 0) {
      const newId = Math.max(...classSubjects.map(cs => cs.id)) + 1
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      
      const selectedClass = availableClasses.find(c => c.id === parseInt(newClassSubject.classId))
      
      setClassSubjects([...classSubjects, {
        id: newId,
        classId: parseInt(newClassSubject.classId),
        className: selectedClass.name,
        section: selectedClass.section,
        includeSemesters: newClassSubject.includeSemesters,
        coreSubjects: newClassSubject.coreSubjects,
        createdAt: timestamp,
        updatedAt: timestamp
      }])
      setNewClassSubject({
        classId: '',
        includeSemesters: false,
        coreSubjects: []
      })
    }
  }

  const handleEdit = (classSubject) => {
    setEditingClassSubject(classSubject)
    setEditData({
      classId: classSubject.classId,
      includeSemesters: classSubject.includeSemesters,
      coreSubjects: [...classSubject.coreSubjects]
    })
  }

  const handleUpdate = () => {
    if (editData.classId && editData.coreSubjects.length > 0) {
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      
      const selectedClass = availableClasses.find(c => c.id === editData.classId)
      
      setClassSubjects(classSubjects.map(cs =>
        cs.id === editingClassSubject.id
          ? { 
              ...cs, 
              classId: editData.classId,
              className: selectedClass.name,
              section: selectedClass.section,
              includeSemesters: editData.includeSemesters,
              coreSubjects: editData.coreSubjects,
              updatedAt: timestamp 
            }
          : cs
      ))
      setEditingClassSubject(null)
      setEditData({})
    }
  }

  const handleDelete = (classSubjectId) => {
    setClassSubjects(classSubjects.filter(cs => cs.id !== classSubjectId))
    setShowDeleteModal(null)
  }

  const addCoreSubject = () => {
    if (editData.coreSubjects.length < availableSubjects.length) {
      setEditData({
        ...editData,
        coreSubjects: [...editData.coreSubjects, { id: Date.now(), name: '', type: '' }]
      })
    }
  }

  const removeCoreSubject = (index) => {
    setEditData({
      ...editData,
      coreSubjects: editData.coreSubjects.filter((_, i) => i !== index)
    })
  }

  const updateCoreSubject = (index, subjectId) => {
    const selectedSubject = availableSubjects.find(s => s.id === parseInt(subjectId))
    if (selectedSubject) {
      const updatedSubjects = [...editData.coreSubjects]
      updatedSubjects[index] = selectedSubject
      setEditData({
        ...editData,
        coreSubjects: updatedSubjects
      })
    }
  }

  // Helper functions for create form
  const addNewCoreSubject = () => {
    if (newClassSubject.coreSubjects.length < availableSubjects.length) {
      setNewClassSubject({
        ...newClassSubject,
        coreSubjects: [...newClassSubject.coreSubjects, { id: Date.now(), name: '', type: '' }]
      })
    }
  }

  const removeNewCoreSubject = (index) => {
    setNewClassSubject({
      ...newClassSubject,
      coreSubjects: newClassSubject.coreSubjects.filter((_, i) => i !== index)
    })
  }

  const updateNewCoreSubject = (index, subjectId) => {
    const selectedSubject = availableSubjects.find(s => s.id === parseInt(subjectId))
    if (selectedSubject) {
      const updatedSubjects = [...newClassSubject.coreSubjects]
      updatedSubjects[index] = selectedSubject
      setNewClassSubject({
        ...newClassSubject,
        coreSubjects: updatedSubjects
      })
    }
  }

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }))
  }

  const filteredClassSubjects = classSubjects.filter(classSubject =>
    classSubject.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classSubject.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classSubject.coreSubjects.some(subject => 
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
          Manage Class Subject
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '1200px'
      }}>
        {/* Create Class Subject Panel */}
        <div style={{
          ...commonStyles.card.base,
          height: 'fit-content'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            Create Class Subject
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
                  Class <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={newClassSubject.classId}
                  onChange={(e) => setNewClassSubject({...newClassSubject, classId: e.target.value})}
                  required
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableClasses.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name} - {classItem.section}
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
                  Include Semesters <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={newClassSubject.includeSemesters ? 'true' : 'false'}
                  onChange={(e) => setNewClassSubject({...newClassSubject, includeSemesters: e.target.value === 'true'})}
                  required
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                  Core Subjects
                </h4>
                <span style={{ fontSize: '16px', color: colors.textSecondary }}>ℹ️</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {newClassSubject.coreSubjects.map((subject, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <select
                      value={subject.id || ''}
                      onChange={(e) => updateNewCoreSubject(index, e.target.value)}
                      style={{
                        ...commonStyles.input.base,
                        backgroundColor: colors.background,
                        flex: 1
                      }}
                    >
                      <option value="">Select Subject</option>
                      {availableSubjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name} - {sub.type}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeNewCoreSubject(index)}
                      style={{
                        padding: '8px',
                        backgroundColor: colors.error,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: colors.textInverse,
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addNewCoreSubject}
                style={{
                  ...commonStyles.button.secondary,
                  padding: '12px 16px',
                  fontSize: '14px',
                  backgroundColor: colors.secondary
                }}
              >
                Core Subjects +
              </button>
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

        {/* List Class Subject Panel */}
        <div style={commonStyles.card.base}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
          List Class Subject
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
                    { key: 'name', label: 'Class Name' },
                    { key: 'section', label: 'Section' },
                    { key: 'semester', label: 'Semester' },
                    { key: 'coreSubjects', label: 'Core Subjects' },
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
                {visibleColumns.name && (
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
                {visibleColumns.semester && (
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: colors.textSecondary
                  }}>
                    Semester
                  </th>
                )}
                {visibleColumns.coreSubjects && (
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: colors.textSecondary
                  }}>
                    Core Subjects
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
              {filteredClassSubjects.map((classSubject, index) => (
                <tr key={classSubject.id} style={{ borderBottom: `1px solid ${colors.backgroundSecondary}` }}>
                  {visibleColumns.id && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      {classSubject.id}
                    </td>
                  )}
                  {visibleColumns.no && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      {index + 1}
                    </td>
                  )}
                  {visibleColumns.name && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      {classSubject.className}
                    </td>
                  )}
                  {visibleColumns.section && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      {classSubject.section}
                    </td>
                  )}
                  {visibleColumns.semester && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      <button
                        style={{
                          padding: '4px 12px',
                          backgroundColor: classSubject.includeSemesters ? colors.secondary : colors.accent,
                          color: colors.textInverse,
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setClassSubjects(classSubjects.map(cs =>
                            cs.id === classSubject.id ? { ...cs, includeSemesters: !cs.includeSemesters } : cs
                          ))
                        }}
                      >
                        {classSubject.includeSemesters ? 'YES' : 'NO'}
                      </button>
                    </td>
                  )}
                  {visibleColumns.coreSubjects && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {classSubject.coreSubjects.map((subject, idx) => (
                          <div key={idx} style={{ fontSize: '12px' }}>
                            {subject.name} - {subject.type}
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                  {visibleColumns.createdAt && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      {classSubject.createdAt}
                    </td>
                  )}
                  {visibleColumns.updatedAt && (
                    <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                      {classSubject.updatedAt}
                    </td>
                  )}
                  {visibleColumns.action && (
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEdit(classSubject)}
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
                          onClick={() => setShowDeleteModal(classSubject)}
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
           Showing 1 to {filteredClassSubjects.length} of {classSubjects.length} rows
         </div>
       </div>
       </div>

      {/* Edit Modal */}
      {editingClassSubject && (
        <div style={commonStyles.modal.overlay}>
          <div style={{
            ...commonStyles.modal.content,
            width: '90%',
            maxWidth: '800px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                Edit Class Subject
              </h3>
              <button
                onClick={() => {
                  setEditingClassSubject(null)
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
                      {classItem.name} - {classItem.section}
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
                  Include Semesters <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={editData.includeSemesters ? 'true' : 'false'}
                  onChange={(e) => setEditData({...editData, includeSemesters: e.target.value === 'true'})}
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                  Core Subjects
                </h4>
                <span style={{ fontSize: '16px', color: colors.textSecondary }}>ℹ️</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {editData.coreSubjects?.map((subject, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <select
                      value={subject.id || ''}
                      onChange={(e) => updateCoreSubject(index, e.target.value)}
                      style={{
                        ...commonStyles.input.base,
                        backgroundColor: colors.background,
                        flex: 1
                      }}
                    >
                      <option value="">Select Subject</option>
                      {availableSubjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name} - {sub.type}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeCoreSubject(index)}
                      style={{
                        padding: '8px',
                        backgroundColor: colors.error,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: colors.textInverse,
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addCoreSubject}
                style={{
                  ...commonStyles.button.secondary,
                  padding: '12px 16px',
                  fontSize: '14px',
                  backgroundColor: colors.secondary
                }}
              >
                Core Subjects +
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setEditingClassSubject(null)
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

export default ClassSubjectPage
