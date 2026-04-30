import CryptoJS from 'crypto-js';

// Encrypts data before it goes to Spring Boot
export const encryptSecret = (plainText, masterKey) => {
    if (!masterKey) throw new Error("Master Key is required for encryption.");
    return CryptoJS.AES.encrypt(plainText, masterKey).toString();
};

// Decrypts data coming back from Spring Boot
export const decryptSecret = (ciphertext, masterKey) => {
    if (!masterKey) throw new Error("Master Key is required for decryption.");
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, masterKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption failed. Incorrect Master Key?");
        return "Decryption Error";
    }
};