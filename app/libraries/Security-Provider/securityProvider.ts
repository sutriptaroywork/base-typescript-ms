import bcrypt from 'bcryptjs';
import { createHmac } from 'crypto';
import { Crypt } from 'hybrid-crypto-js';
// const crypt = new Crypt()
class SecurityProvider {
  private saltRound: number;
  private secretKeyForCrypto: string;
  private algorithm: string;
  private digest: string;
  private crypt: Crypt;

  constructor() {
    this.saltRound = 10;
    this.secretKeyForCrypto = process.env.SECRET_FOR_CRYPTO || 'sportsbuzz_fantasy';
    this.algorithm = 'sha256';
    this.digest = 'hex';
    this.crypt = new Crypt();
  }

  get algorithmForCrypto(): string {
    return this.algorithm;
  }

  set algorithmForCrypto(val: string) {
    if (val) {
      this.algorithm = val;
    }
  }

  get cryptoDigest(): string {
    return this.digest;
  }

  set cryptoDigest(val: string) {
    if (val) {
      this.digest = val;
    }
  }

  hashString(str: string, saltRound: number = this.saltRound): string {
    const convertToStr = str.toString();
    const genSalt = bcrypt.genSaltSync(saltRound);
    const hashStr = bcrypt.hashSync(convertToStr, genSalt);
    return hashStr;
  }

  compareHashString(str: string, hashedStr: string): boolean {
    const isHashedStrMatch = bcrypt.compareSync(str, hashedStr);
    return isHashedStrMatch;
  }

  hashStrWithCrypto(str: string): string {
    const hmacHash = createHmac(this.algorithm, this.secretKeyForCrypto)
      .update(str)
      .digest(this.digest as any);
    return hmacHash;
  }

  maskAadhaarNumber(mainStr: string): string {
    const lastFourDigit = mainStr.slice(-4);
    let maskedDigit = '';
    for (let i = mainStr.length - 4; i > 0; i--) {
      maskedDigit += 'X';
    }
    return maskedDigit + lastFourDigit;
  }
  encryption(field): string {
    const encrypted = this.crypt.encrypt(process.env.PUBLIC_KEY, field);
    return encrypted.toString();
  }

  decryption(password): string {
    const decrypted = this.crypt.decrypt(process.env.PRIVATE_KEY, password);
    const decryptedData = decrypted.message;
    return decryptedData.toString();
  }
}

export default SecurityProvider;
