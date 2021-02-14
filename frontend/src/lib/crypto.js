import CryptoJS from 'crypto-js';

const encrypt = (plaintext, secret, salt) => {
    return CryptoJS.AES.encrypt(plaintext + salt, secret).toString()
  }

  const decrypt = (ciphertext, secret, salt) => {
    return CryptoJS.AES.decrypt(ciphertext, secret).toString(CryptoJS.enc.Utf8).slice(0, -salt.length)
  }

export {
    encrypt,
    decrypt
}