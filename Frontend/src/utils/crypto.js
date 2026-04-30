import CryptoJS from 'crypto-js';

// PBKDF2 Configuration
const KEY_SIZE = 256 / 32; // 256-bit key (CryptoJS uses words, so 256/32 = 8 words)
const ITERATIONS = 10000;  // High iteration count to thwart brute-force attacks

// Encrypts data before it goes to Spring Boot
export const encryptSecret = (plainText, masterKey) => {
    if (!masterKey) throw new Error("Master Key is required for encryption.");

    // 1. Generate a random 128-bit salt
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    // 2. Derive a strong key using PBKDF2
    const key = CryptoJS.PBKDF2(masterKey, salt, {
        keySize: KEY_SIZE,
        iterations: ITERATIONS
    });

    // 3. Generate a random 128-bit Initialization Vector (IV)
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // 4. Encrypt using AES-CBC with the derived key and IV
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    // 5. Combine salt, IV, and ciphertext into a single string separated by colons
    // Format: saltHex:ivHex:ciphertextBase64
    return salt.toString() + ':' + iv.toString() + ':' + encrypted.toString();
};

// Decrypts data coming back from Spring Boot
export const decryptSecret = (encryptedBlob, masterKey) => {
    if (!masterKey) throw new Error("Master Key is required for decryption.");

    try {
        // If it's the old insecure format (no colons), handle it gracefully or fail securely
        if (!encryptedBlob.includes(':')) {
            console.warn("Legacy un-salted encryption detected. Please migrate data.");
            const bytes = CryptoJS.AES.decrypt(encryptedBlob, masterKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        }

        // 1. Split the blob back into its components
        const parts = encryptedBlob.split(':');
        if (parts.length !== 3) throw new Error("Invalid encrypted blob format");

        const salt = CryptoJS.enc.Hex.parse(parts[0]);
        const iv = CryptoJS.enc.Hex.parse(parts[1]);
        const ciphertext = parts[2];

        // 2. Re-derive the exact same key using the extracted salt
        const key = CryptoJS.PBKDF2(masterKey, salt, {
            keySize: KEY_SIZE,
            iterations: ITERATIONS
        });

        // 3. Decrypt using the derived key and extracted IV
        const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        const plainText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        // If plainText is empty, it means the master key was wrong and decryption yielded garbage
        if (!plainText) throw new Error("Malformed UTF-8 data");

        return plainText;
        
    } catch (error) {
        console.error("Decryption failed. Incorrect Master Key or corrupted data.");
        return "Decryption Error";
    }
};