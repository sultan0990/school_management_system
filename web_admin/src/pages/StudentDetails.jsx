// Student Details Component - Matching eSchool Design
// web_admin/src/pages/StudentDetails.jsx

import React, { useState } from 'react';
import { colors } from '../utils/theme.js';

const StudentDetails = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      grNumber: '2025-2614',
      firstName: 'John',
      lastName: 'Doe',
      class: 'Class 10 A',
      mobile: '9876543210',
      email: 'john.doe@email.com',
      admissionDate: '2024-04-01',
      status: 'Active',
      fatherName: 'Robert Doe',
      motherName: 'Jane Doe'
    },
    {
      id: 2,
      grNumber: '2025-2615',
      firstName: 'Jane',
      lastName: 'Smith',
      class: 'Class 10 B',
      mobile: '9876543211',
      email: 'jane.smith@email.com',
      admissionDate: '2024-04-02',
      status: 'Active',
      fatherName: 'Michael Smith',
      motherName: 'Sarah Smith'
    },
    {
      id: 3,
      grNumber: '2025-2616',
      firstName: 'Mike',
      lastName: 'Johnson',
      class: 'Class 9 A',
      mobile: '9876543212',
      email: 'mike.johnson@email.com',
      admissionDate: '2024-04-03',
      status: 'Active',
      fatherName: 'David Johnson',
      motherName: 'Lisa Johnson'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobile.includes(searchTerm);
    
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return { backgroundColor: colors.secondary + '20', color: colors.secondary };
      case 'Inactive':
        return { backgroundColor: colors.danger + '20', color: colors.danger };
      case 'Graduated':
        return { backgroundColor: colors.primary + '20', color: colors.primary };
      default:
        return { backgroundColor: colors.textSecondary + '20', color: colors.textSecondary };
    }
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
            Manage Students
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: colors.textSecondary 
          }}>
            Create and manage student admissions
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
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>Total Students</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.textPrimary, margin: 0 }}>{students.length}</p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: colors.primary + '20', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '20px' }}>👥</span>
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
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>Active Students</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.secondary, margin: 0 }}>
                  {students.filter(s => s.status === 'Active').length}
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
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>Classes</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.accent, margin: 0 }}>
                  {new Set(students.map(s => s.class)).size}
                </p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: colors.accent + '20', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '20px' }}>🏫</span>
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
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 8px 0' }}>New This Month</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.warning, margin: 0 }}>3</p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: colors.warning + '20', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '20px' }}>🆕</span>
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
                  placeholder="Search students..."
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
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
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
                  <option value="all">All Classes</option>
                  <option value="Class 10 A">Class 10 A</option>
                  <option value="Class 10 B">Class 10 B</option>
                  <option value="Class 9 A">Class 9 A</option>
                  <option value="Class 9 B">Class 9 B</option>
                  <option value="Class 8 A">Class 8 A</option>
                  <option value="Class 8 B">Class 8 B</option>
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
                <span>Add Student</span>
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

        {/* Students Table */}
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
              Student List
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
                    GR Number
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Student Name
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.borderLight}`
                  }}>
                    Class
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
                    Admission Date
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
                {filteredStudents.map((student) => (
                  <tr key={student.id} style={{ 
                    borderBottom: `1px solid ${colors.borderLight}`,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.backgroundTertiary}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {student.grNumber}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {student.firstName} {student.lastName}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {student.class}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {student.mobile}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colors.textPrimary }}>
                      {student.admissionDate}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        ...getStatusColor(student.status)
                      }}>
                        {student.status}
                      </span>
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

          {filteredStudents.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: colors.textSecondary
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                No students found
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Try adjusting your search criteria or add a new student
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
                Add Student
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
