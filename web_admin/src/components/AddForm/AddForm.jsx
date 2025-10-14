import React, { useState } from 'react'
import getIcon from '../../utils/icons.jsx'
import { colors, commonStyles } from '../../utils/theme.js'

const AddForm = ({ showAddForm, setShowAddForm, formType, setFormType, onAddData }) => {
  const [formData, setFormData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const timestamp = new Date().toISOString()
    const newData = {
      id: Date.now().toString(),
      ...formData,
      createdAt: timestamp
    }
    onAddData(formType, newData)
    setFormData({})
    setShowAddForm(false)
    setFormType('')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getFormFields = () => {
    switch (formType) {
      case 'teacher':
        return [
          { name: 'name', label: 'Teacher Name', type: 'text', required: true },
          { name: 'subject', label: 'Subject', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true }
        ]
      case 'student':
        return [
          { name: 'name', label: 'Student Name', type: 'text', required: true },
          { name: 'grade', label: 'Grade', type: 'text', required: true },
          { name: 'parentName', label: 'Parent Name', type: 'text', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true }
        ]
      case 'parent':
        return [
          { name: 'name', label: 'Parent Name', type: 'text', required: true },
          { name: 'studentName', label: 'Student Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true }
        ]
      case 'attendance':
        return [
          { name: 'studentName', label: 'Student Name', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'status', label: 'Status', type: 'select', required: true, options: ['Present', 'Absent', 'Late'] }
        ]
      case 'leave':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'type', label: 'Leave Type', type: 'text', required: true },
          { name: 'startDate', label: 'Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'End Date', type: 'date', required: true },
          { name: 'reason', label: 'Reason', type: 'textarea', required: true }
        ]
      default:
        return []
    }
  }

  if (!showAddForm) return null

  return (
    <div style={commonStyles.modal.overlay}>
      <div style={{
        ...commonStyles.modal.content,
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.textPrimary, margin: 0 }}>
            Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
          </h3>
          <button
            onClick={() => {
              setShowAddForm(false)
              setFormType('')
              setFormData({})
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
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.backgroundSecondary}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {getFormFields().map((field) => (
            <div key={field.name} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.textSecondary, marginBottom: '8px' }}>
                {field.label} {field.required && <span style={{ color: colors.error }}>*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  required={field.required}
                  style={{
                    ...commonStyles.input.base,
                    backgroundColor: colors.background
                  }}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  rows={3}
                  style={{
                    ...commonStyles.input.base,
                    resize: 'vertical'
                  }}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                />
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  style={commonStyles.input.base}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false)
                setFormType('')
                setFormData({})
              }}
              style={{
                ...commonStyles.button.outline,
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                ...commonStyles.button.secondary,
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddForm
