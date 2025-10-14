// Teacher Details Component - Matching eSchool Design
// web_admin/src/pages/TeacherDetails.jsx

import React, { useState } from 'react';
import { colors } from '../utils/theme.js';

const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@school.com',
      mobile: '9876543210',
      gender: 'Male',
      qualification: 'M.Sc Mathematics',
      subjects: ['Mathematics', 'Physics'],
      classes: ['Class 10 A', 'Class 9 A'],
      joiningDate: '2023-04-01',
      status: 'Active',
      hasPermission: true
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@school.com',
      mobile: '9876543211',
      gender: 'Female',
      qualification: 'M.A English',
      subjects: ['English', 'Literature'],
      classes: ['Class 10 B', 'Class 9 B'],
      joiningDate: '2023-04-15',
      status: 'Active',
      hasPermission: false
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@school.com',
      mobile: '9876543212',
      gender: 'Male',
      qualification: 'B.Sc Chemistry',
      subjects: ['Chemistry', 'Biology'],
      classes: ['Class 8 A', 'Class 7 A'],
      joiningDate: '2023-05-01',
      status: 'Active',
      hasPermission: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.mobile.includes(searchTerm) ||
      teacher.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || teacher.subjects.includes(selectedSubject);
    
    return matchesSearch && matchesSubject;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: colors.secondary + '20', color: colors.secondary };
      case 'Inactive':
        return { backgroundColor: colors.danger + '20', color: colors.danger };
      case 'On Leave':
        return { backgroundColor: colors.warning + '20', color: colors.warning };
      default:
        return { backgroundColor: colors.textSecondary + '20', color: colors.textSecondary };
    }
  };

  const getAllSubjects = () => {
    const subjects = new Set();
    teachers.forEach(teacher => {
      teacher.subjects.forEach(subject => subjects.add(subject));
    });
    return Array.from(subjects);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.backgroundSecondary,
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: colors.textPrimary,
            marginBottom: '8px'
          }}>
            Manage Teacher
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: colors.textSecondary 
          }}>
            Create and manage teacher profiles
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: colors.background,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${colors.borderLight}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>Total Teachers</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.textPrimary, margin: 0 }}>{teachers.length}</p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: colors.primary + '20', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '20px' }}>👨‍🏫</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: colors.background,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${colors.borderLight}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>Active Teachers</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.secondary, margin: 0 }}>
                  {teachers.filter(t => t.status === 'Active').length}
                </p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: colors.secondary + '20', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '20px' }}>✅</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: colors.background,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${colors.borderLight}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>Subjects</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.accent, margin: 0 }}>
                  {getAllSubjects().length}
                </p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: colors.accent + '20', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '20px' }}>📚</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: colors.background,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${colors.borderLight}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>With Permissions</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.warning, margin: 0 }}>
                  {teachers.filter(t => t.hasPermission).length}
                </p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: colors.warning + '20', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '20px' }}>🔐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div style={{
          backgroundColor: colors.background,
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.borderLight}`,
          marginBottom: '24px'
        }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '16px', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
              <div style={{ flex: 1, maxWidth: '300px' }}>
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: colors.background,
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>
              <div style={{ minWidth: '150px' }}>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: colors.background,
                    transition: 'border-color 0.2s'
                  }}
                >
                  <option value="all">All Subjects</option>
                  {getAllSubjects().map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: colors.primary,
                  color: colors.textInverse,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + 'dd'}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
              >
                <span>+</span>
                <span>Add Teacher</span>
              </button>
              <button
                style={{
                  padding: '12px 20px',
                  backgroundColor: 'transparent',
                  color: colors.textSecondary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.backgroundTertiary;
                  e.target.style.borderColor = colors.textSecondary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = colors.border;
                }}
              >
                <span>📊</span>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Teachers Table */}
        <div style={{
          backgroundColor: colors.background,
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.borderLight}`,
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px', borderBottom: `1px solid ${colors.borderLight}` }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: colors.textPrimary,
              margin: 0
            }}>
              Teacher List
            </h3>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: colors.backgroundTertiary }}>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Teacher Name
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Email
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Mobile
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Qualification
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Subjects
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Status
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} style={{ 
                    borderBottom: `1px solid ${colors.borderLight}`,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.backgroundTertiary}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>
                          {teacher.firstName} {teacher.lastName}
                        </div>
                        <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                          {teacher.gender}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {teacher.email}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {teacher.mobile}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {teacher.qualification}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {teacher.subjects.map((subject, index) => (
                          <span
                            key={index}
                            style={{
                              padding: '2px 8px',
                              backgroundColor: colors.primary + '20',
                              color: colors.primary,
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          ...getStatusColor(teacher.status)
                        }}>
                          {teacher.status}
                        </span>
                        {teacher.hasPermission && (
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: '500',
                            backgroundColor: colors.warning + '20',
                            color: colors.warning
                          }}>
                            Has Permissions
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          style={{
                            padding: '6px 12px',
                            backgroundColor: colors.primary + '20',
                            color: colors.primary,
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '30'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary + '20'}
                        >
                          View
                        </button>
                        <button
                          style={{
                            padding: '6px 12px',
                            backgroundColor: colors.secondary + '20',
                            color: colors.secondary,
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = colors.secondary + '30'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = colors.secondary + '20'}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            padding: '6px 12px',
                            backgroundColor: colors.danger + '20',
                            color: colors.danger,
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = colors.danger + '30'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = colors.danger + '20'}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTeachers.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: colors.textSecondary
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👨‍🏫</div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                No teachers found
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Try adjusting your search criteria or add a new teacher
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: colors.primary,
                  color: colors.textInverse,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + 'dd'}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
              >
                Add Teacher
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
