import FingerprintJS from '@fingerprintjs/fingerprintjs';

export class Fingerprint {
  static load() {
    return FingerprintJS.load();
  }

  static async getVisitorId() {
    const fp = await this.load();
    const result = await fp.get();
    return result.visitorId;
  }
}
