import React, { useState, useEffect } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const ClassPage = () => {
  // Available sections from Section page
  const [availableSections] = useState([
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' }
  ])

  const [classes, setClasses] = useState([
    { 
      id: 1, 
      name: '10', 
      section: 'A', 
      includeSemesters: false,
      createdAt: '13-06-2022 16:47:23', 
      updatedAt: '16-06-2022 02:53:10' 
    },
    { 
      id: 2, 
      name: '8', 
      section: 'B', 
      includeSemesters: false,
      createdAt: '13-06-2022 16:47:27', 
      updatedAt: '16-06-2022 02:53:06' 
    },
    { 
      id: 3, 
      name: '9', 
      section: 'A', 
      includeSemesters: false,
      createdAt: '13-06-2022 16:47:32', 
      updatedAt: '16-06-2022 02:52:58' 
    }
  ])

  const [newClass, setNewClass] = useState({
    name: '',
    section: '',
    includeSemesters: false
  })

  const [editingClass, setEditingClass] = useState(null)
  const [editData, setEditData] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    name: true,
    section: true,
    semester: true,
    action: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newClass.name.trim() && newClass.section.trim()) {
      const newId = Math.max(...classes.map(c => c.id)) + 1
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setClasses([...classes, {
        id: newId,
        ...newClass,
        createdAt: timestamp,
        updatedAt: timestamp
      }])
      setNewClass({
        name: '',
        section: '',
        includeSemesters: false
      })
    }
  }

  const handleEdit = (classItem) => {
    setEditingClass(classItem)
    setEditData({
      name: classItem.name,
      section: classItem.section,
      includeSemesters: classItem.includeSemesters
    })
  }

  const handleUpdate = () => {
    if (editData.name.trim() && editData.section.trim()) {
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setClasses(classes.map(c =>
        c.id === editingClass.id
          ? { ...c, ...editData, updatedAt: timestamp }
          : c
      ))
      setEditingClass(null)
      setEditData({})
    }
  }

  const handleDelete = (classId) => {
    setClasses(classes.filter(c => c.id !== classId))
    setShowDeleteModal(null)
  }

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }))
  }

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.section.toLowerCase().includes(searchTerm.toLowerCase())
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
          Manage Class
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '1200px'
      }}>
        {/* Create Class Panel */}
        <div style={{
          ...commonStyles.card.base,
          height: 'fit-content'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            Create Class
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
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
                  value={newClass.name}
                  onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                  placeholder="Name"
                  required
                  style={commonStyles.input.base}
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
                  Section <span style={{ color: colors.error }}>*</span>
                </label>
                <select
                  value={newClass.section}
                  onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                  required
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                >
                  <option value="">Please Select</option>
                  {availableSections.map((section) => (
                    <option key={section.id} value={section.name}>{section.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary
              }}>
                <input
                  type="checkbox"
                  checked={newClass.includeSemesters}
                  onChange={(e) => setNewClass({...newClass, includeSemesters: e.target.checked})}
                  style={{ accentColor: colors.primary }}
                />
                Include Semesters
              </label>
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

        {/* List Class Panel */}
        <div style={commonStyles.card.base}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            List Class
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
                      { key: 'name', label: 'Class Name' },
                      { key: 'section', label: 'Section' },
                      { key: 'semester', label: 'Semester' },
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
                {filteredClasses.map((classItem, index) => (
                  <tr key={classItem.id} style={{ borderBottom: `1px solid ${colors.backgroundSecondary}` }}>
                    {visibleColumns.no && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {index + 1}
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classItem.name}
                      </td>
                    )}
                    {visibleColumns.section && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {classItem.section}
                      </td>
                    )}
                    {visibleColumns.semester && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        <button
                          style={{
                            padding: '4px 12px',
                            backgroundColor: classItem.includeSemesters ? colors.secondary : colors.accent,
                            color: colors.textInverse,
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setClasses(classes.map(c =>
                              c.id === classItem.id ? { ...c, includeSemesters: !c.includeSemesters } : c
                            ))
                          }}
                        >
                          {classItem.includeSemesters ? 'YES' : 'NO'}
                        </button>
                      </td>
                    )}
                    {visibleColumns.action && (
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(classItem)}
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
                            onClick={() => setShowDeleteModal(classItem)}
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
            Showing 1 to {filteredClasses.length} of {classes.length} rows
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingClass && (
        <div style={commonStyles.modal.overlay}>
          <div style={commonStyles.modal.content}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                Edit Class
              </h3>
              <button
                onClick={() => {
                  setEditingClass(null)
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
                  <option key={section.id} value={section.name}>{section.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary
              }}>
                <input
                  type="checkbox"
                  checked={editData.includeSemesters || false}
                  onChange={(e) => setEditData({...editData, includeSemesters: e.target.checked})}
                  style={{ accentColor: colors.primary }}
                />
                Include Semesters
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setEditingClass(null)
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

export default ClassPage
