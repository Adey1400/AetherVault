# AetherVault 🌌

> A Zero-Knowledge, client-side encrypted credential manager. 

AetherVault is a secure password manager built with a strict **Zero-Knowledge Architecture (ZKA)**. It ensures that user credentials are encrypted on the client device before they ever touch the network. The backend database and server act strictly as a blind storage vault, meaning even in the event of a total server breach, user data remains mathematically secure.

## 🔐 Core Security Architecture

This application employs industry-standard cryptographic protocols to ensure absolute data privacy:

*   **Zero-Knowledge Architecture:** The server never receives, processes, or stores plaintext passwords or encryption keys.
*   **AES-256 Encryption:** All vault items are encrypted symmetrically on the client-side using Advanced Encryption Standard (AES) before transmission.
*   **PBKDF2 Key Derivation:** Human-readable Master Keys are stretched using PBKDF2 with 10,000+ iterations to derive mathematically robust 256-bit AES keys, thwarting brute-force attacks.
*   **Cryptographic Salting:** Unique, randomly generated salts protect the derived keys against Rainbow Table attacks.
*   **Initialization Vectors (IV):** Randomized IVs ensure that identical passwords produce entirely unique ciphertexts, preventing pattern recognition in the database.

## 🛠️ Tech Stack

### Frontend (The Trusted Zone)
*   **React (Vite):** Fast, modern UI development.
*   **Tailwind CSS & Framer Motion:** Fluid, glassmorphic "Antigravity" aesthetic with complex state animations.
*   **CryptoJS:** Synchronous client-side cryptographic engine handling AES, PBKDF2, and RNG.
*   **React Context API:** Secure, volatile RAM-only state management for the user's Master Key.

### Backend (The Untrusted Zone)
*   **Java & Spring Boot:** Robust REST API architecture.
*   **Spring Security:** Stateless session management utilizing short-lived JWTs and Google OAuth2 integration.
*   **Spring Data JPA / Hibernate:** Blind ORM processing.
*   **PostgreSQL:** Relational database strictly storing ciphertexts, salts, and IVs.

## 🌊 System Flow

### 1. Data Vault Loop (Sequence)
1. User enters plaintext credential into the React UI.
2. React derives the AES key and encrypts the payload locally.
3. React attaches the Auth JWT and transmits the ciphertext over HTTPS.
4. Spring Boot intercepts, validates the JWT, and blindly routes the payload to PostgreSQL.

<img width="7085" height="3960" alt="image" src="https://github.com/user-attachments/assets/cde4862f-af3a-45dd-837a-8f7cec295c1c" />




