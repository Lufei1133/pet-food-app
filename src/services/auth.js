// src/services/auth.js
import axios from 'axios';
import { encryptSM4 } from './encryption';

const API_URL = 'https://jerry.macz.cloud/api';

// 定义路由路径
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/'
};

const AuthService = {
  async login(email, password) {
    try {
      const encryptedPassword = await encryptSM4(password);

      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password: encryptedPassword
      });

      if (response.status === 200) {
        if (response.data.ok) {
          // 登录成功，保存用户信息
          const userData = {
            token: response.data.data.token,
            email: response.data.data.email
          };
          localStorage.setItem('user', JSON.stringify(userData));
          return response.data;
        } else {
          throw new Error(response.data.msg);
        }
      } else {
        throw new Error('Server is busy, please try again later');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        throw new Error('Server is busy, please try again later');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Server is busy, please try again later');
      }
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user?.token;
  }
};

export default AuthService;