// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // 替换为实际的API地址

const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async register(username, email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  getAuthHeader() {
    const user = this.getCurrentUser();
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  }
};

export default AuthService;