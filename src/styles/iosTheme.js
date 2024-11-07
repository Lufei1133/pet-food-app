// src/styles/iosTheme.js

export const iosTheme = {
    colors: {
      // iOS 系统色
      systemBlue: '#007AFF',
      systemGreen: '#34C759',
      systemRed: '#FF3B30',
      systemGray: '#8E8E93',
      systemGray2: '#AEAEB2',
      systemGray3: '#C7C7CC',
      systemBackground: '#F2F2F7',
      secondarySystemBackground: '#FFFFFF',
      
      // 自定义颜色
      cardBackground: 'rgba(255, 255, 255, 0.95)',
      glassEffect: 'rgba(255, 255, 255, 0.8)',
    },
    
    spacing: {
      base: '16px',
      small: '12px',
      medium: '24px',
      large: '32px',
    },
    
    borderRadius: {
      small: '8px',
      medium: '12px',
      large: '16px',
      xl: '24px',
    },
    
    // iOS 系统字体
    typography: {
      fontFamily: '-apple-system, SF Pro Text, SF Pro Icons',
      sizes: {
        title1: '28px',
        title2: '22px',
        title3: '20px',
        headline: '17px',
        body: '17px',
        callout: '16px',
        subhead: '15px',
        footnote: '13px',
        caption1: '12px',
        caption2: '11px',
      },
      weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
    
    // iOS 风格阴影
    shadows: {
      small: '0 2px 8px rgba(0, 0, 0, 0.04)',
      medium: '0 4px 12px rgba(0, 0, 0, 0.08)',
      large: '0 8px 16px rgba(0, 0, 0, 0.12)',
    },
  };