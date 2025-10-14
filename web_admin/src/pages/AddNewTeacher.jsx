// Add New Teacher Component - Matching eSchool Design
// web_admin/src/pages/AddNewTeacher.jsx

import React, { useState } from 'react';
import { colors } from '../utils/theme.js';

const AddNewTeacher = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: 'Male',
    image: '',
    dateOfBirth: '',
    qualification: '',
    currentAddress: '',
    permanentAddress: '',
    grantPermission: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teacher form submitted:', formData);
    // Handle form submission here
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: colors.background,
    transition: 'border-color 0.2s'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: '8px'
  };

  const requiredStyle = {
    color: colors.error
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.backgroundSecondary,
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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

        {/* Form Card */}
        <div style={{
          backgroundColor: colors.background,
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.borderLight}`
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: colors.textPrimary,
            marginBottom: '24px'
          }}>
            Create Teacher
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {/* First Name */}
              <div>
                <label style={labelStyle}>
                  First Name <span style={requiredStyle}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label style={labelStyle}>
                  Last Name <span style={requiredStyle}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label style={labelStyle}>
                  Gender <span style={requiredStyle}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === 'Male'}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '16px', color: colors.textPrimary }}>Male</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === 'Female'}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '16px', color: colors.textPrimary }}>Female</span>
                  </label>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label style={labelStyle}>
                  Mobile <span style={requiredStyle}>*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>
                  Email <span style={requiredStyle}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label style={labelStyle}>Image</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Image"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    style={{
                      padding: '12px 16px',
                      backgroundColor: colors.primary,
                      color: colors.textInverse,
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + 'dd'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    Upload
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label style={labelStyle}>
                  Date of Birth <span style={requiredStyle}>*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Qualification */}
              <div>
                <label style={labelStyle}>
                  Qualification <span style={requiredStyle}>*</span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="Qualification"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Current Address */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  Current Address <span style={requiredStyle}>*</span>
                </label>
                <textarea
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  placeholder="Current Address"
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  required
                />
              </div>

              {/* Permanent Address */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  Permanent Address <span style={requiredStyle}>*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="Permanent Address"
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  required
                />
              </div>
            </div>

            {/* Permissions Section */}
            <div style={{ 
              marginTop: '32px', 
              padding: '20px', 
              backgroundColor: colors.backgroundTertiary,
              borderRadius: '8px',
              border: `1px solid ${colors.borderLight}`
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: colors.textPrimary
                }}>
                  <input
                    type="checkbox"
                    name="grantPermission"
                    checked={formData.grantPermission}
                    onChange={handleInputChange}
                    style={{ 
                      marginRight: '12px',
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer'
                    }}
                  />
                  Grant permission to manage students and parents
                </label>
              </div>
              
              <div style={{
                padding: '12px 16px',
                backgroundColor: colors.primary + '10',
                borderRadius: '6px',
                border: `1px solid ${colors.primary + '30'}`
              }}>
                <p style={{ 
                  fontSize: '14px', 
                  color: colors.primary,
                  margin: 0,
                  fontWeight: '500'
                }}>
                  <span style={{ fontWeight: '600' }}>Note:</span> By giving the permission of manage student and parent to teacher, teacher can manage student's and parent's data.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '16px',
              paddingTop: '24px',
              borderTop: `1px solid ${colors.borderLight}`,
              marginTop: '24px'
            }}>
              <button
                type="button"
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: colors.textSecondary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
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
                Cancel
              </button>
              <button
                type="submit"
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
                Create Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewTeacher;
