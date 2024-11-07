// src/services/OpenAIService.js

// 导出异步聊天函数
export const chatWithAI = async (messages) => {
  try {
    // 构建请求体
    const requestBody = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI veterinarian. You provide helpful advice about pet health, but always remind users to consult with a real veterinarian for serious concerns. Consider the pet's information: ${JSON.stringify(messages.petInfo)}`
        },
        ...messages.conversation
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    // 发起请求
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    // 获取响应
    const data = await response.json();

    // 错误处理
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    // 返回响应内容
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error chatting with AI:', error);
    throw new Error('Failed to communicate with AI assistant. Please try again.');
  }
};

// 添加健康建议功能
export const getHealthAdvice = async (petInfo) => {
  try {
    const response = await chatWithAI({
      petInfo,
      conversation: [
        {
          role: "user",
          content: `Please provide general health advice for my ${petInfo.type}, considering their age is ${petInfo.age} and weight is ${petInfo.weight}kg.`
        }
      ]
    });
    return response;
  } catch (error) {
    console.error('Error getting health advice:', error);
    throw error;
  }
};

// 添加症状分析功能
export const analyzeSymptoms = async (petInfo, symptoms) => {
  try {
    const response = await chatWithAI({
      petInfo,
      conversation: [
        {
          role: "user",
          content: `My ${petInfo.type} is showing these symptoms: ${symptoms}. What could be the potential causes and should I be concerned?`
        }
      ]
    });
    return response;
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
};

// 添加紧急情况评估功能
export const assessEmergency = async (petInfo, situation) => {
  try {
    const response = await chatWithAI({
      petInfo,
      conversation: [
        {
          role: "user",
          content: `Emergency situation: ${situation}. Is this an emergency that requires immediate veterinary care?`
        }
      ]
    });
    return response;
  } catch (error) {
    console.error('Error assessing emergency:', error);
    throw error;
  }
};

// 错误处理工具函数
const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    return error.response.data.error || 'An error occurred with the AI service';
  }
  if (error.request) {
    console.error('No response received:', error.request);
    return 'No response received from the AI service';
  }
  console.error('Error:', error.message);
  return 'An unexpected error occurred';
};

// 验证 API 密钥
const verifyApiKey = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }
  return apiKey;
};

export default {
  chatWithAI,
  getHealthAdvice,
  analyzeSymptoms,
  assessEmergency
};