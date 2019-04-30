import { createHash, hashMatches } from '../../src/utils/auth';

describe('AuthUtil', () => {
  describe('createHash', () => {
    it('should hash a plain text string', async () => {
      expect(await createHash('haash')).toBeTruthy();
    });
  });
  describe('hashMatches', () => {
    it('should return true for equal strings', async () => {
      const hash = await createHash('haash');
      expect(await hashMatches(hash, 'haash')).toBeTruthy();
    });
  });
});
