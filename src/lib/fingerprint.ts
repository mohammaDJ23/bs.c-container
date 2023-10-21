import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

export class Fingerprint {
  static load() {
    return FingerprintJS.load({ apiKey: process.env.FINGERPRINT_API_KEY! });
  }

  static async getVisitorId() {
    const fp = await this.load();
    const result = await fp.get();
    return result.visitorId;
  }
}
