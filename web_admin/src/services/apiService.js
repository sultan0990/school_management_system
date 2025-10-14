// API Service for Web Admin - Connect to Real Backend
// web_admin/src/services/apiService.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Generic API call method
  static async apiCall(endpoint, method = 'GET', data = null) {
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'API call failed');
      }

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Student Management
  static async createStudent(studentData) {
    return this.apiCall('/admin/create-student', 'POST', studentData);
  }

  static async getStudents() {
    return this.apiCall('/admin/students');
  }

  static async getStudent(id) {
    return this.apiCall(`/admin/student/${id}`);
  }

  // Teacher Management
  static async createTeacher(teacherData) {
    return this.apiCall('/admin/create-teacher', 'POST', teacherData);
  }

  static async getTeachers() {
    return this.apiCall('/admin/teachers');
  }

  static async getTeacher(id) {
    return this.apiCall(`/admin/teacher/${id}`);
  }

  // Authentication
  static async requestOTP(mobile, userType) {
    return this.apiCall('/auth/request-otp', 'POST', { mobile, userType });
  }

  static async verifyOTP(mobile, otp, userType) {
    return this.apiCall('/auth/verify-otp', 'POST', { mobile, otp, userType });
  }

  static async checkAuthStatus(token) {
    return this.apiCall('/auth/status', 'GET', null, {
      'Authorization': `Bearer ${token}`
    });
  }
}

export default ApiService;
