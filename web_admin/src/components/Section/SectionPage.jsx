import React, { useState, useEffect } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const SectionPage = () => {
  console.log('SectionPage component is rendering')
  
  const [sections, setSections] = useState([
    { id: 1, name: 'A', createdAt: '13-06-2022 16:47:23', updatedAt: '16-06-2022 02:53:10' },
    { id: 2, name: 'B', createdAt: '13-06-2022 16:47:27', updatedAt: '16-06-2022 02:53:06' },
    { id: 3, name: 'C', createdAt: '13-06-2022 16:47:32', updatedAt: '16-06-2022 02:52:58' },
    { id: 4, name: 'D', createdAt: '13-06-2022 16:47:35', updatedAt: '16-06-2022 02:52:55' }
  ])
  const [newSection, setNewSection] = useState('')
  const [editingSection, setEditingSection] = useState(null)
  const [editName, setEditName] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    no: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    action: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newSection.trim()) {
      const newId = Math.max(...sections.map(s => s.id)) + 1
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' + 
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setSections([...sections, { 
        id: newId, 
        name: newSection.trim(),
        createdAt: timestamp,
        updatedAt: timestamp
      }])
      setNewSection('')
    }
  }

  const handleEdit = (section) => {
    setEditingSection(section)
    setEditName(section.name)
  }

  const handleUpdate = () => {
    if (editName.trim()) {
      const now = new Date()
      const timestamp = now.toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' + 
                       now.toLocaleTimeString('en-GB', { hour12: false })
      setSections(sections.map(s => 
        s.id === editingSection.id 
          ? { ...s, name: editName.trim(), updatedAt: timestamp }
          : s
      ))
      setEditingSection(null)
      setEditName('')
    }
  }

  const handleDelete = (sectionId) => {
    setSections(sections.filter(s => s.id !== sectionId))
    setShowDeleteModal(null)
  }

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }))
  }

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Manage Section
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        maxWidth: '1200px'
      }}>
        {/* Create Section Panel */}
        <div style={{
          ...commonStyles.card.base,
          height: 'fit-content'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            Create Section
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
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                placeholder="Name"
                required
                style={{
                  ...commonStyles.input.base
                }}
                onFocus={(e) => e.target.style.borderColor = colors.borderFocus}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
            </div>
            
            <button
              type="submit"
              style={{
                ...commonStyles.button.primary,
                width: '100%'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
            >
              Submit
            </button>
          </form>
        </div>

        {/* List Section Panel */}
        <div style={commonStyles.card.base}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: '0 0 24px 0' }}>
            List Section
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
                      { key: 'id', label: 'Id' },
                      { key: 'no', label: 'No.' },
                      { key: 'name', label: 'Name' },
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

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
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
                       Name
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
                {filteredSections.map((section, index) => (
                  <tr key={section.id} style={{ borderBottom: `1px solid ${colors.backgroundSecondary}` }}>
                    {visibleColumns.id && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {section.id}
                      </td>
                    )}
                    {visibleColumns.no && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {index + 1}
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {section.name}
                      </td>
                    )}
                    {visibleColumns.createdAt && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {section.createdAt}
                      </td>
                    )}
                    {visibleColumns.updatedAt && (
                      <td style={{ padding: '12px', fontSize: '14px', color: colors.textSecondary }}>
                        {section.updatedAt}
                      </td>
                    )}
                    {visibleColumns.action && (
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(section)}
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
                            onClick={() => setShowDeleteModal(section)}
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
            Showing 1 to {filteredSections.length} of {sections.length} rows
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSection && (
        <div style={commonStyles.modal.overlay}>
          <div style={commonStyles.modal.content}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
                Edit Section
              </h3>
              <button
                onClick={() => {
                  setEditingSection(null)
                  setEditName('')
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
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={commonStyles.input.base}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setEditingSection(null)
                  setEditName('')
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

export default SectionPage
