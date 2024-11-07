import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, Camera, Send, Image as ImageIcon, 
  Bot, Loader, AlertCircle 
} from 'lucide-react';
import { chatWithAI } from '../../services/OpenAIService';

const AiDoctor = ({ petInfo }) => {
  const [messages, setMessages] = useState([
    {
      type: 'system',
      content: `Hi! I'm Dr. AI. I can help you with ${petInfo.name}'s health concerns. How can I assist you today?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const newMessage = {
      type: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 准备对话历史
      const conversationHistory = messages
        .filter(msg => msg.type !== 'system')
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

      // 添加新消息
      conversationHistory.push({
        role: 'user',
        content: newMessage.content
      });

      // 调用 AI 服务
      const response = await chatWithAI({
        petInfo,
        conversation: conversationHistory
      });

      setMessages(prev => [
        ...prev,
        {
          type: 'ai',
          content: response
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          type: 'error',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* 聊天头部 */}
      <div className="border-b p-4">
        <div className="flex items-center">
          <Bot className="h-6 w-6 text-blue-500 mr-2" />
          <div>
            <h2 className="font-semibold">AI Veterinarian</h2>
            <p className="text-sm text-gray-500">Available 24/7 for your pet's health questions</p>
          </div>
        </div>
      </div>

      {/* 聊天区域 */}
      <div className="h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.type === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.type === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-500 mb-1" />
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Dr. AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Dr. AI about your pet's health..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: This is an AI assistant. For serious health concerns, please consult with a real veterinarian.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AiDoctor;