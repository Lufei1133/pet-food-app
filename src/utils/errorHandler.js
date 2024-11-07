// src/utils/errorHandler.js

export const handleApiError = (error) => {
    if (error.response) {
      // API 返回了错误响应
      console.error('API Error:', error.response.data);
      return `Error: ${error.response.data.error || 'Something went wrong'}`;
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('No response received:', error.request);
      return 'Error: Unable to connect to the service';
    } else {
      // 发生了其他错误
      console.error('Error:', error.message);
      return 'Error: Something went wrong';
    }
  };