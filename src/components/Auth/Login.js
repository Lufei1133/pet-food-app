import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// Social Icons Components (same as before)
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
);

const AppleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
          fill="currentColor"
          d="M17.05 20.28c-.98.95-2.05.9-3.11.4-1.12-.5-2.14-.51-3.31 0-1.44.62-2.2.44-3.02-.4C3.77 16.14 4.3 9.25 8.86 8.85c1.53-.15 2.37.4 3.02.45.65.05 1.86-.55 3.47-.3 1.85.3 2.95 1.2 3.5 2.3-3.25 1.95-2.75 5.85.2 6.98-.75 1.6-1.75 2.75-3 2z M16.45 8.35c-.8-2.75 1.1-5.35 3.55-5.85.35 2.65-1.75 5.35-3.55 5.85Z"
      />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
          fill="currentColor"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
);

const WeChatIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
          fill="currentColor"
          d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098c.933.265 1.947.411 3.002.411h.507c-.019-.198-.027-.399-.027-.602 0-3.63 3.517-6.57 7.858-6.57h.473c-.446-4.054-4.192-7.518-8.976-7.518M6.066 6.181c.558 0 1.009.45 1.009 1.005s-.45 1.005-1.009 1.005c-.558 0-1.009-.45-1.009-1.005 0-.555.45-1.005 1.009-1.005m5.25 0c.558 0 1.009.45 1.009 1.005s-.45 1.005-1.009 1.005c-.558 0-1.009-.45-1.009-1.005 0-.555.45-1.005 1.009-1.005m5.587 4.453c-3.789 0-6.864 2.572-6.864 5.744 0 3.172 3.075 5.744 6.864 5.744.798 0 1.563-.13 2.273-.313a.664.664 0 0 1 .537.076l1.416.83a.26.26 0 0 0 .132.044c.122 0 .222-.1.222-.223 0-.052-.022-.102-.035-.154l-.29-1.107a.447.447 0 0 1 .162-.505c1.366-1.016 2.183-2.511 2.183-3.905 0-3.172-3.075-5.744-6.864-5.744m-2.266 2.459c.419 0 .758.338.758.754a.755.755 0 0 1-.758.754.755.755 0 0 1-.757-.754c0-.416.339-.754.757-.754m4.479 0c.419 0 .757.338.757.754a.755.755 0 0 1-.757.754.755.755 0 0 1-.758-.754c0-.416.339-.754.758-.754"
      />
    </svg>
);

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
      <div className="min-h-screen bg-[#f5f5f7] px-6 py-12 flex flex-col">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-[32px] font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-[17px] text-gray-500">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-[14px] pl-12 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-[17px] text-gray-900 placeholder:text-gray-400"
            />
            <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-[14px] pl-12 pr-12 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-[17px] text-gray-900 placeholder:text-gray-400"
            />
            <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4 top-4"
            >
              {isPasswordVisible ?
                  <EyeOff className="h-5 w-5 text-gray-400" /> :
                  <Eye className="h-5 w-5 text-gray-400" />
              }
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button type="button" className="text-[15px] text-blue-500 font-medium hover:text-blue-600">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gray-900 text-white py-[14px] rounded-2xl flex items-center justify-center space-x-2 text-[17px] font-medium transition-all ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-gray-800 active:scale-[0.99]'
              }`}
          >
            <span>Sign In</span>
            {!isLoading && <ArrowRight className="h-5 w-5" />}
            {isLoading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-[15px] text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: GoogleIcon, color: '#DB4437', text: 'Google' },
              { icon: FacebookIcon, color: '#1877F2', text: 'Facebook' },
              { icon: WeChatIcon, color: '#07C160', text: 'WeChat' },
              { icon: AppleIcon, color: '#000000', text: 'Apple' }
            ].map((provider) => (
                <button
                    key={provider.text}
                    type="button"
                    className="group relative flex items-center justify-center aspect-square bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 hover:border-gray-300/50 transition-all"
                >
                  <div className={`text-[${provider.color}]`}>
                    <provider.icon />
                  </div>
                </button>
            ))}
          </div>
        </form>

        {/* Sign Up Prompt */}
        <p className="mt-8 text-center text-[15px] text-gray-600">
          Don't have an account?{' '}
          <button className="text-blue-500 font-medium hover:text-blue-600">
            Sign up now
          </button>
        </p>
      </div>
  );
};

export default Login;