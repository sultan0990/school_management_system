import React, { useState, useEffect } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([
    { 
      id: 1, 
      name: 'Science', 
      subjectCode: 'SCI', 
      backgroundColor: '#67c2d4', 
      type: 'Theory', 
      createdAt: '13-06-2022 16:47:23', 
      updatedAt: '16-06-2022 02:53:10' 
    },
    { 
      id: 2, 
      name: 'Computer', 
      subjectCode: 'COM', 
      backgroundColor: '#d96767', 
      type: 'Practical', 
      createdAt: '13-06-2022 16:47:27', 
      updatedAt: '16-06-2022 02:53:06' 
    },
    { 
      id: 3, 
      name: 'Music', 
      subjectCode: 'M', 
      backgroundColor: '#f1951b', 
      type: 'Practical', 
      createdAt: '13-06-2022 16:47:32', 
      updatedAt: '16-06-2022 02:52:58' 
    },
    { 
      id: 4, 
      name: 'Chemistry', 
      subjectCode: 'CH', 
      backgroundColor: 'transparent', 
      type: 'Theory', 
      createdAt: '13-06-2022 16:47:35', 
      updatedAt: '16-06-2022 02:52:55' 
    },
    { 
      id: 5, 
      name: 'Drawing', 
      subjectCode: 'DW', 
      backgroundColor: '#f874ae', 
      type: 'Practical', 
      createdAt: '13-06-2022 16:47:40', 
      updatedAt: '16-06-2022 02:52:50' 
    },
    { 
      id: 6, 
      name: 'Computer', 
      subjectCode: 'CMP', 
      backgroundColor: '#1e87fd', 
      type: 'Practical', 
      createdAt: '13-06-2022 16:47:45', 
      updatedAt: '16-06-2022 02:52:45' 
    }
  ])

  const [newSubject, setNewSubject] = useState({
    name: '',
    subjectCode: '',
    backgroundColor: '#3b82f6',
    type: 'Theory',
    image: ''
  })

  const [editingSubject, setEditingSubject] = useState(null)
  const [editData, setEditData] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    name: true,
    subjectCode: true,
    backgroundColor: true,
    type: true,
    action: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newSubject.name.trim()) {
      const newId = Math.max(...subjects.map(s => s.id)) + 1
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setSubjects([...subjects, {
        id: newId,
        ...newSubject,
        createdAt: timestamp,
        updatedAt: timestamp
      }])
      setNewSubject({
        name: '',
        subjectCode: '',
        backgroundColor: '#3b82f6',
        type: 'Theory',
        image: ''
      })
    }
  }

  const handleEdit = (subject) => {
    setEditingSubject(subject)
    setEditData({
      name: subject.name,
      subjectCode: subject.subjectCode,
      backgroundColor: subject.backgroundColor,
      type: subject.type,
      image: subject.image || ''
    })
  }

  const handleUpdate = () => {
    if (editData.name.trim()) {
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setSubjects(subjects.map(s =>
        s.id === editingSubject.id
          ? { ...s, ...editData, updatedAt: timestamp }
          : s
      ))
      setEditingSubject(null)
      setEditData({})
    }
  }

  const handleDelete = (subjectId) => {
    setSubjects(subjects.filter(s => s.id !== subjectId))
    setShowDeleteModal(null)
  }

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }))
  }

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
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
          Manage Subject
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '1200px'
      }}>
        {/* Create Subject Panel */}
        <div style={{
          ...commonStyles.card.base,
          height: 'fit-content'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            Create Subject
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Name <span style={{ color: colors.error }}>*</span>
              </label>
              <input
                type="text"
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                placeholder="Name"
                required
                style={commonStyles.input.base}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Type <span style={{ color: colors.error }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="type"
                    value="Theory"
                    checked={newSubject.type === 'Theory'}
                    onChange={(e) => setNewSubject({...newSubject, type: e.target.value})}
                    style={{ accentColor: colors.primary }}
                  />
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>Theory</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="type"
                    value="Practical"
                    checked={newSubject.type === 'Practical'}
                    onChange={(e) => setNewSubject({...newSubject, type: e.target.value})}
                    style={{ accentColor: colors.primary }}
                  />
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>Practical</span>
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Subject Code
              </label>
              <input
                type="text"
                value={newSubject.subjectCode}
                onChange={(e) => setNewSubject({...newSubject, subjectCode: e.target.value})}
                placeholder="Subject Code"
                style={commonStyles.input.base}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Background Color <span style={{ color: colors.error }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  value={newSubject.backgroundColor}
                  onChange={(e) => setNewSubject({...newSubject, backgroundColor: e.target.value})}
                  placeholder="Background color (Hex color only)"
                  required
                  style={{
                    ...commonStyles.input.base,
                    flex: 1
                  }}
                />
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: newSubject.backgroundColor,
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Image <span style={{ color: colors.error }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        setNewSubject({...newSubject, image: e.target.result})
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  style={{
                    ...commonStyles.input.base,
                    flex: 1,
                    padding: '8px 12px'
                  }}
                />
                {newSubject.image && (
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: `2px solid ${colors.border}`
                  }}>
                    <img 
                      src={newSubject.image} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
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

        {/* List Subject Panel */}
        <div style={commonStyles.card.base}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            List Subject
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
                    padding: '8px 0'
                  }}>
                    <div style={{ padding: '4px 12px', fontSize: '12px', color: colors.textSecondary, fontWeight: '500' }}>
                      Column Visibility
                    </div>
                    <div style={{ borderTop: `1px solid ${colors.borderLight}`, margin: '4px 0' }}></div>
                    {[
                      { key: 'no', label: 'No.' },
                      { key: 'name', label: 'Name' },
                      { key: 'subjectCode', label: 'Subject Code' },
                      { key: 'backgroundColor', label: 'Background Color' },
                      { key: 'type', label: 'Type' },
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
                      Name
                    </th>
                  )}
                  {visibleColumns.subjectCode && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Subject Code
                    </th>
                  )}
                  {visibleColumns.backgroundColor && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Background Color
                    </th>
                  )}
                  {visibleColumns.type && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Type
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
                {filteredSubjects.map((subject, index) => (
                  <tr key={subject.id} style={{ borderBottom: `1px solid ${colors.backgroundSecondary}` }}>
                    {visibleColumns.no && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {index + 1}
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {subject.name}
                      </td>
                    )}
                    {visibleColumns.subjectCode && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {subject.subjectCode}
                      </td>
                    )}
                    {visibleColumns.backgroundColor && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: subject.backgroundColor === 'transparent' ? colors.borderLight : subject.backgroundColor,
                            border: `1px solid ${colors.border}`,
                            borderRadius: '4px'
                          }}></div>
                          <span>{subject.backgroundColor}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.type && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {subject.type}
                      </td>
                    )}
                    {visibleColumns.action && (
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(subject)}
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
                            onClick={() => setShowDeleteModal(subject)}
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
            Showing 1 to {filteredSubjects.length} of {subjects.length} rows
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSubject && (
        <div style={commonStyles.modal.overlay}>
          <div style={commonStyles.modal.content}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                Edit Subject
              </h3>
              <button
                onClick={() => {
                  setEditingSubject(null)
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

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Name <span style={{ color: colors.error }}>*</span>
              </label>
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                style={commonStyles.input.base}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Type <span style={{ color: colors.error }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="editType"
                    value="Theory"
                    checked={editData.type === 'Theory'}
                    onChange={(e) => setEditData({...editData, type: e.target.value})}
                    style={{ accentColor: colors.primary }}
                  />
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>Theory</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="editType"
                    value="Practical"
                    checked={editData.type === 'Practical'}
                    onChange={(e) => setEditData({...editData, type: e.target.value})}
                    style={{ accentColor: colors.primary }}
                  />
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>Practical</span>
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Subject Code
              </label>
              <input
                type="text"
                value={editData.subjectCode || ''}
                onChange={(e) => setEditData({...editData, subjectCode: e.target.value})}
                style={commonStyles.input.base}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Background Color <span style={{ color: colors.error }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  value={editData.backgroundColor || ''}
                  onChange={(e) => setEditData({...editData, backgroundColor: e.target.value})}
                  style={{
                    ...commonStyles.input.base,
                    flex: 1
                  }}
                />
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: editData.backgroundColor || colors.primary,
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px'
                }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Image <span style={{ color: colors.error }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        setEditData({...editData, image: e.target.result})
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  style={{
                    ...commonStyles.input.base,
                    flex: 1,
                    padding: '8px 12px'
                  }}
                />
                {editData.image && (
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: `2px solid ${colors.border}`
                  }}>
                    <img 
                      src={editData.image} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setEditingSubject(null)
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
                Edit
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

export default SubjectPage
