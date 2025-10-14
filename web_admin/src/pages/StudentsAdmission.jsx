// Student Admission Component - Matching eSchool Design
// web_admin/src/pages/StudentsAdmission.jsx

import React, { useState } from 'react';
import { colors } from '../utils/theme.js';

const StudentsAdmission = () => {
  const [formData, setFormData] = useState({
    // Student Details
    firstName: '',
    lastName: '',
    mobile: '',
    gender: 'Male',
    image: '',
    dateOfBirth: '',
    classSection: '',
    category: '',
    grNumber: '2025-2614',
    caste: '',
    religion: '',
    admissionDate: '',
    bloodGroup: '',
    height: '',
    weight: '',
    currentAddress: '',
    permanentAddress: '',
    
    // Father Details
    fatherEmail: '',
    fatherFirstName: '',
    fatherLastName: '',
    fatherMobile: '',
    fatherDateOfBirth: '',
    fatherOccupation: '',
    fatherImage: '',
    
    // Mother Details
    motherEmail: '',
    motherFirstName: '',
    motherLastName: '',
    motherMobile: '',
    motherDateOfBirth: '',
    motherOccupation: '',
    motherImage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
            Manage Students
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: colors.textSecondary 
          }}>
            Create and manage student admissions
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
            Create Students
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Student Details Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: colors.textPrimary,
                marginBottom: '20px',
                paddingBottom: '8px',
                borderBottom: `2px solid ${colors.borderLight}`
              }}>
                Student Details
              </h3>
              
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

                {/* Mobile */}
                <div>
                  <label style={labelStyle}>Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile"
                    style={inputStyle}
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

                {/* Image */}
                <div>
                  <label style={labelStyle}>
                    Image <span style={requiredStyle}>*</span>
                  </label>
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

                {/* Class Section */}
                <div>
                  <label style={labelStyle}>
                    Class Section <span style={requiredStyle}>*</span>
                  </label>
                  <select
                    name="classSection"
                    value={formData.classSection}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  >
                    <option value="">Select Class Section</option>
                    <option value="Class 10 A">Class 10 A</option>
                    <option value="Class 10 B">Class 10 B</option>
                    <option value="Class 9 A">Class 9 A</option>
                    <option value="Class 9 B">Class 9 B</option>
                    <option value="Class 8 A">Class 8 A</option>
                    <option value="Class 8 B">Class 8 B</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label style={labelStyle}>
                    Category <span style={requiredStyle}>*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                {/* GR Number */}
                <div>
                  <label style={labelStyle}>
                    GR Number <span style={requiredStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    name="grNumber"
                    value={formData.grNumber}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, backgroundColor: colors.backgroundTertiary }}
                    readOnly
                  />
                </div>

                {/* Caste */}
                <div>
                  <label style={labelStyle}>Caste</label>
                  <input
                    type="text"
                    name="caste"
                    value={formData.caste}
                    onChange={handleInputChange}
                    placeholder="Caste"
                    style={inputStyle}
                  />
                </div>

                {/* Religion */}
                <div>
                  <label style={labelStyle}>Religion</label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    placeholder="Religion"
                    style={inputStyle}
                  />
                </div>

                {/* Admission Date */}
                <div>
                  <label style={labelStyle}>
                    Admission Date <span style={requiredStyle}>*</span>
                  </label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* Blood Group */}
                <div>
                  <label style={labelStyle}>
                    Blood Group <span style={requiredStyle}>*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* Height */}
                <div>
                  <label style={labelStyle}>
                    Height <span style={requiredStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Height"
                    style={inputStyle}
                    required
                  />
                </div>

                {/* Weight */}
                <div>
                  <label style={labelStyle}>
                    Weight <span style={requiredStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Weight"
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
            </div>

            {/* Parents Details Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: colors.textPrimary,
                marginBottom: '20px',
                paddingBottom: '8px',
                borderBottom: `2px solid ${colors.borderLight}`
              }}>
                Parents Details
              </h3>

              {/* Father Details */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: colors.textPrimary,
                  marginBottom: '16px'
                }}>
                  Father Details
                </h4>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '20px' 
                }}>
                  <div>
                    <label style={labelStyle}>
                      Father Email <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="email"
                      name="fatherEmail"
                      value={formData.fatherEmail}
                      onChange={handleInputChange}
                      placeholder="Father Email"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Father First Name <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fatherFirstName"
                      value={formData.fatherFirstName}
                      onChange={handleInputChange}
                      placeholder="Father First Name"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Father Last Name <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fatherLastName"
                      value={formData.fatherLastName}
                      onChange={handleInputChange}
                      placeholder="Father Last Name"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Father Mobile <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="fatherMobile"
                      value={formData.fatherMobile}
                      onChange={handleInputChange}
                      placeholder="Father Mobile"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Father Date of Birth <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="date"
                      name="fatherDateOfBirth"
                      value={formData.fatherDateOfBirth}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Father Occupation <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                      placeholder="Father Occupation"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Father Image <span style={requiredStyle}>*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        name="fatherImage"
                        value={formData.fatherImage}
                        onChange={handleInputChange}
                        placeholder="Father Image"
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
                </div>
              </div>

              {/* Mother Details */}
              <div>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: colors.textPrimary,
                  marginBottom: '16px'
                }}>
                  Mother Details
                </h4>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '20px' 
                }}>
                  <div>
                    <label style={labelStyle}>
                      Mother Email <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="email"
                      name="motherEmail"
                      value={formData.motherEmail}
                      onChange={handleInputChange}
                      placeholder="Mother Email"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Mother First Name <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      name="motherFirstName"
                      value={formData.motherFirstName}
                      onChange={handleInputChange}
                      placeholder="Mother First Name"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Mother Last Name <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      name="motherLastName"
                      value={formData.motherLastName}
                      onChange={handleInputChange}
                      placeholder="Mother Last Name"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Mother Mobile <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="motherMobile"
                      value={formData.motherMobile}
                      onChange={handleInputChange}
                      placeholder="Mother Mobile"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Mother Date of Birth <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="date"
                      name="motherDateOfBirth"
                      value={formData.motherDateOfBirth}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Mother Occupation <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleInputChange}
                      placeholder="Mother Occupation"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Mother Image <span style={requiredStyle}>*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        name="motherImage"
                        value={formData.motherImage}
                        onChange={handleInputChange}
                        placeholder="Mother Image"
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
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '16px',
              paddingTop: '24px',
              borderTop: `1px solid ${colors.borderLight}`
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
                Create Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentsAdmission;
