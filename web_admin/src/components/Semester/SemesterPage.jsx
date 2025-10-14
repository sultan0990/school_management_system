import React, { useState, useEffect } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const SemesterPage = () => {
  const [semesters, setSemesters] = useState([
    { 
      id: 1, 
      name: 'Sem 2', 
      startMonth: 'January', 
      endMonth: 'June', 
      status: false,
      createdAt: '13-06-2022 16:47:23', 
      updatedAt: '16-06-2022 02:53:10' 
    },
    { 
      id: 2, 
      name: 'Sem 1', 
      startMonth: 'July', 
      endMonth: 'December', 
      status: true,
      createdAt: '13-06-2022 16:47:27', 
      updatedAt: '16-06-2022 02:53:06' 
    }
  ])

  const [newSemester, setNewSemester] = useState({
    name: '',
    startMonth: '',
    endMonth: ''
  })

  const [editingSemester, setEditingSemester] = useState(null)
  const [editData, setEditData] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    name: true,
    startMonth: true,
    endMonth: true,
    status: true,
    action: true
  })

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newSemester.name.trim() && newSemester.startMonth && newSemester.endMonth) {
      const newId = Math.max(...semesters.map(s => s.id)) + 1
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setSemesters([...semesters, {
        id: newId,
        ...newSemester,
        status: false, // New semesters start as inactive
        createdAt: timestamp,
        updatedAt: timestamp
      }])
      setNewSemester({
        name: '',
        startMonth: '',
        endMonth: ''
      })
    }
  }

  const handleEdit = (semester) => {
    setEditingSemester(semester)
    setEditData({
      name: semester.name,
      startMonth: semester.startMonth,
      endMonth: semester.endMonth,
      status: semester.status
    })
  }

  const handleUpdate = () => {
    if (editData.name.trim() && editData.startMonth && editData.endMonth) {
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' +
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setSemesters(semesters.map(s =>
        s.id === editingSemester.id
          ? { ...s, ...editData, updatedAt: timestamp }
          : s
      ))
      setEditingSemester(null)
      setEditData({})
    }
  }

  const handleDelete = (semesterId) => {
    setSemesters(semesters.filter(s => s.id !== semesterId))
    setShowDeleteModal(null)
  }

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }))
  }

  const filteredSemesters = semesters.filter(semester =>
    semester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    semester.startMonth.toLowerCase().includes(searchTerm.toLowerCase()) ||
    semester.endMonth.toLowerCase().includes(searchTerm.toLowerCase())
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
          Manage Semester
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '1200px'
      }}>
        {/* Create Semester Panel */}
        <div style={{
          ...commonStyles.card.base,
          height: 'fit-content'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            Create New Semester
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
                value={newSemester.name}
                onChange={(e) => setNewSemester({...newSemester, name: e.target.value})}
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
                Start Month <span style={{ color: colors.error }}>*</span>
              </label>
              <select
                value={newSemester.startMonth}
                onChange={(e) => setNewSemester({...newSemester, startMonth: e.target.value})}
                required
                style={{
                  ...commonStyles.input.base,
                  backgroundColor: colors.background
                }}
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                End Month <span style={{ color: colors.error }}>*</span>
              </label>
              <select
                value={newSemester.endMonth}
                onChange={(e) => setNewSemester({...newSemester, endMonth: e.target.value})}
                required
                style={{
                  ...commonStyles.input.base,
                  backgroundColor: colors.background
                }}
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
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

        {/* List Semester Panel */}
        <div style={commonStyles.card.base}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            List Semester
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
                      { key: 'no', label: 'No.' },
                      { key: 'name', label: 'Name' },
                      { key: 'startMonth', label: 'Start Month' },
                      { key: 'endMonth', label: 'End Month' },
                      { key: 'status', label: 'Status' },
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
                  {visibleColumns.startMonth && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Start Month
                    </th>
                  )}
                  {visibleColumns.endMonth && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      End Month
                    </th>
                  )}
                  {visibleColumns.status && (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.textSecondary
                    }}>
                      Status
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
                {filteredSemesters.map((semester, index) => (
                  <tr key={semester.id} style={{ borderBottom: `1px solid ${colors.backgroundSecondary}` }}>
                    {visibleColumns.no && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {index + 1}
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {semester.name}
                      </td>
                    )}
                    {visibleColumns.startMonth && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {semester.startMonth}
                      </td>
                    )}
                    {visibleColumns.endMonth && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {semester.endMonth}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        <button
                          style={{
                            padding: '4px 12px',
                            backgroundColor: semester.status ? colors.secondary : colors.error,
                            color: colors.textInverse,
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setSemesters(semesters.map(s =>
                              s.id === semester.id ? { ...s, status: !s.status } : s
                            ))
                          }}
                        >
                          {semester.status ? 'YES' : 'NO'}
                        </button>
                      </td>
                    )}
                    {visibleColumns.action && (
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(semester)}
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
                            onClick={() => setShowDeleteModal(semester)}
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
            Showing 1 to {filteredSemesters.length} of {semesters.length} rows
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSemester && (
        <div style={commonStyles.modal.overlay}>
          <div style={commonStyles.modal.content}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                Edit Semester
              </h3>
              <button
                onClick={() => {
                  setEditingSemester(null)
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
                Start Month <span style={{ color: colors.error }}>*</span>
              </label>
              <select
                value={editData.startMonth || ''}
                onChange={(e) => setEditData({...editData, startMonth: e.target.value})}
                style={{
                  ...commonStyles.input.base,
                  backgroundColor: colors.background
                }}
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                End Month <span style={{ color: colors.error }}>*</span>
              </label>
              <select
                value={editData.endMonth || ''}
                onChange={(e) => setEditData({...editData, endMonth: e.target.value})}
                style={{
                  ...commonStyles.input.base,
                  backgroundColor: colors.background
                }}
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: '8px'
              }}>
                Status
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="status"
                    value="true"
                    checked={editData.status === true}
                    onChange={(e) => setEditData({...editData, status: true})}
                    style={{ accentColor: colors.primary }}
                  />
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>Active</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="status"
                    value="false"
                    checked={editData.status === false}
                    onChange={(e) => setEditData({...editData, status: false})}
                    style={{ accentColor: colors.primary }}
                  />
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>Inactive</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setEditingSemester(null)
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

export default SemesterPage
