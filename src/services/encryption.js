// src/services/encryption.js

import { sm4 } from 'sm-crypto';

// 使用环境变量存储基础密钥材料
const BASE_KEY = process.env.REACT_APP_SM4_BASE_KEY || '1234567890abcdef';

/**
 * 字符串转16进制
 */
function stringToHex(str) {
    let hex = '';
    for(let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex;
}

/**
 * SM4加密函数
 * @param {string} plaintext - 要加密的明文
 * @returns {string} - Base64编码的密文
 */
export function encryptSM4(plaintext) {
    try {
        if (!plaintext) {
            throw new Error('Encryption input cannot be empty');
        }

        // 将密钥转换为十六进制字符串
        const keyHex = stringToHex(BASE_KEY);

        // SM4加密，返回十六进制字符串
        const encryptedHex = sm4.encrypt(plaintext, keyHex, {
            mode: 'ecb',
            padding: 'pkcs#5',
            cipherType: 'hex'
        });

        // 将加密的十六进制字符串按字符转换为字节数组（UTF-8编码）
        const encryptedBytes = [];
        for (let i = 0; i < encryptedHex.length; i++) {
            encryptedBytes.push(encryptedHex.charCodeAt(i));
        }

        // Base64编码
        const encryptedBase64 = btoa(String.fromCharCode.apply(null, encryptedBytes));

        return encryptedBase64;
    } catch (error) {
        console.error('Encryption error:', error.message);
        throw new Error('Encryption failed');
    }
}

/**
 * SM4解密函数
 * @param {string} ciphertext - Base64编码的密文
 * @returns {string} - 解密后的明文
 */
export function decryptSM4(ciphertext) {
    try {
        if (!ciphertext) {
            throw new Error('Decryption input cannot be empty');
        }

        // 将密钥转换为十六进制字符串
        const keyHex = stringToHex(BASE_KEY);

        // Base64解码，得到加密的十六进制字符串
        const encryptedHex = atob(ciphertext);

        // SM4解密
        const decrypted = sm4.decrypt(encryptedHex, keyHex, {
            mode: 'ecb',
            padding: 'pkcs#5',
            cipherType: 'hex'
        });

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error.message);
        throw new Error('Decryption failed');
    }
}
