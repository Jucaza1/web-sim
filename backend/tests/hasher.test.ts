import {HasherBcrypt} from '../src/services/hashing';
import {describe, expect, it} from '@jest/globals';

describe('HasherBcrypt', () => {
    const hasher = new HasherBcrypt(10);
    const password = 'password123';

    it('should hash a password', () => {
        const hashedPassword = hasher.hash(password);
        expect(hashedPassword).not.toBe(password);
    });

    it('should compare a password with a hash', () => {
        const hashedPassword =hasher.hash(password);
        const isMatch = hasher.compare(password, hashedPassword);
        expect(isMatch).toBe(true);
    });

    it('should not match a wrong password', () => {
        const hashedPassword = hasher.hash(password);
        const isMatch = hasher.compare('wrongpassword', hashedPassword);
        expect(isMatch).toBe(false);
    });
});
