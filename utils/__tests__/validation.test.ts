import * as validation from '../validation';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(validation.isValidEmail('user@example.com')).toBe(true);
      expect(validation.isValidEmail('name.surname@domain.co.uk')).toBe(true);
      expect(validation.isValidEmail('user-name@domain.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validation.isValidEmail('user@')).toBe(false);
      expect(validation.isValidEmail('user@domain')).toBe(false);
      expect(validation.isValidEmail('user domain.com')).toBe(false);
      expect(validation.isValidEmail('')).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('validates non-empty strings', () => {
      expect(validation.isNotEmpty('text')).toBe(true);
      expect(validation.isNotEmpty(' text with spaces ')).toBe(true);
    });

    it('rejects empty strings', () => {
      expect(validation.isNotEmpty('')).toBe(false);
      expect(validation.isNotEmpty('   ')).toBe(false);
    });
  });

  describe('hasMinLength', () => {
    it('validates strings with minimum length', () => {
      expect(validation.hasMinLength('12345', 5)).toBe(true);
      expect(validation.hasMinLength('12345', 3)).toBe(true);
    });

    it('rejects strings shorter than minimum length', () => {
      expect(validation.hasMinLength('123', 5)).toBe(false);
      expect(validation.hasMinLength('', 1)).toBe(false);
    });
  });

  describe('hasMaxLength', () => {
    it('validates strings with maximum length', () => {
      expect(validation.hasMaxLength('12345', 5)).toBe(true);
      expect(validation.hasMaxLength('123', 5)).toBe(true);
    });

    it('rejects strings longer than maximum length', () => {
      expect(validation.hasMaxLength('123456', 5)).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(validation.isValidUrl('https://example.com')).toBe(true);
      expect(validation.isValidUrl('http://subdomain.example.co.uk/path')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(validation.isValidUrl('example')).toBe(false);
      expect(validation.isValidUrl('example.com')).toBe(false); // Missing protocol
      expect(validation.isValidUrl('')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('validates correct phone numbers', () => {
      expect(validation.isValidPhoneNumber('1234567890')).toBe(true);
      expect(validation.isValidPhoneNumber('+1-234-567-8901')).toBe(true);
      expect(validation.isValidPhoneNumber('(123) 456 7890')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(validation.isValidPhoneNumber('123')).toBe(false); // Too short
      expect(validation.isValidPhoneNumber('abcdefghij')).toBe(false); // Non-numeric
      expect(validation.isValidPhoneNumber('')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    it('validates strong passwords', () => {
      expect(validation.isStrongPassword('P@ssw0rd')).toBe(true);
      expect(validation.isStrongPassword('Str0ng!P@ss')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(validation.isStrongPassword('password')).toBe(false); // No uppercase, number, or special char
      expect(validation.isStrongPassword('Password')).toBe(false); // No number or special char
      expect(validation.isStrongPassword('password1')).toBe(false); // No uppercase or special char
      expect(validation.isStrongPassword('Pass1')).toBe(false); // Too short
    });
  });

  describe('validateAll', () => {
    it('returns true when all validations pass', () => {
      expect(validation.validateAll([true, true, true])).toBe(true);
    });

    it('returns false when any validation fails', () => {
      expect(validation.validateAll([true, false, true])).toBe(false);
      expect(validation.validateAll([false, false, false])).toBe(false);
    });
  });

  describe('createErrorMessage', () => {
    it('returns the correct error message for a field and validation type', () => {
      expect(validation.createErrorMessage('البريد الإلكتروني', 'required'))
        .toBe('حقل البريد الإلكتروني مطلوب');
      
      expect(validation.createErrorMessage('كلمة المرور', 'minLength'))
        .toBe('يجب أن يحتوي كلمة المرور على الأقل على الحد الأدنى من الأحرف');
    });

    it('returns a default error message when validation type is not found', () => {
      expect(validation.createErrorMessage('الاسم', 'unknown'))
        .toBe('خطأ في حقل الاسم');
    });
  });
});