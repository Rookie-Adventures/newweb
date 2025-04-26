import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { VerificationService } from '../../verification/verification.service';
import { ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: any;
  let mockJwtService: any;
  let mockVerificationService: any;

  beforeEach(() => {
    mockUsersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      updatePassword: jest.fn(),
    };
    mockJwtService = { sign: jest.fn().mockReturnValue('jwt-token') };
    mockVerificationService = { verifyCode: jest.fn() };
    service = new AuthService(mockUsersService, mockJwtService, mockVerificationService);
  });

  describe('validateUser', () => {
    it('should return user data if password matches', async () => {
      const user = { password: 'hashed', toObject: () => ({ userId: 'id', password: 'hashed' }) };
      mockUsersService.findByEmail.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as unknown as never);
      const result = await service.validateUser('a', 'b');
      expect(result).toHaveProperty('userId', 'id');
    });
    it('should return null if user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      const result = await service.validateUser('a', 'b');
      expect(result).toBeNull();
    });
    it('should return null if password invalid', async () => {
      const user = { password: 'hashed', toObject: () => ({ userId: 'id', password: 'hashed' }) };
      mockUsersService.findByEmail.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as unknown as never);
      const result = await service.validateUser('a', 'b');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return token and user', () => {
      const user = { userId: 'id', email: 'a', role: 'user' };
      const result = service.login(user as any);
      expect(result).toEqual({ token: 'jwt-token', user });
    });
  });

  describe('loginWithPassword', () => {
    it('should throw if user invalid', async () => {
      service.validateUser = jest.fn().mockResolvedValue(null);
      await expect(service.loginWithPassword({ email: 'a', password: 'b' } as any)).rejects.toThrow(UnauthorizedException);
    });
    it('should return login result if valid', async () => {
      service.validateUser = jest.fn().mockResolvedValue({ userId: 'id', email: 'a', role: 'user' });
      service.login = jest.fn().mockReturnValue({ token: 'jwt-token', user: { userId: 'id' } });
      const result = await service.loginWithPassword({ email: 'a', password: 'b' } as any);
      expect(result).toHaveProperty('token', 'jwt-token');
    });
  });

  describe('register', () => {
    it('should throw if email exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue({});
      await expect(service.register({ email: 'a', password: 'b', username: 'u' } as any)).rejects.toThrow(ConflictException);
    });
    it('should create and return user data', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ toObject: () => ({ userId: 'id', password: 'hashed' }) });
      const result = await service.register({ email: 'a', password: 'b', username: 'u' } as any);
      expect(result).toHaveProperty('userId', 'id');
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('registerWithCode', () => {
    it('should throw if code invalid', async () => {
      mockVerificationService.verifyCode.mockResolvedValue({ valid: false, message: 'fail' });
      await expect(service.registerWithCode({ email: 'a', username: 'u', password: 'b', code: '123' } as any)).rejects.toThrow(BadRequestException);
    });
    it('should throw if email exists', async () => {
      mockVerificationService.verifyCode.mockResolvedValue({ valid: true });
      mockUsersService.findByEmail.mockResolvedValue({});
      await expect(service.registerWithCode({ email: 'a', username: 'u', password: 'b', code: '123' } as any)).rejects.toThrow(ConflictException);
    });
    it('should create and return user data', async () => {
      mockVerificationService.verifyCode.mockResolvedValue({ valid: true });
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ toObject: () => ({ userId: 'id', password: 'hashed' }) });
      const result = await service.registerWithCode({ email: 'a', username: 'u', password: 'b', code: '123' } as any);
      expect(result).toHaveProperty('userId', 'id');
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('resetPassword', () => {
    it('should throw if code invalid', async () => {
      mockVerificationService.verifyCode.mockResolvedValue({ valid: false, message: 'fail' });
      await expect(service.resetPassword({ email: 'a', password: 'b', code: '123' } as any)).rejects.toThrow(BadRequestException);
    });
    it('should throw if user not found', async () => {
      mockVerificationService.verifyCode.mockResolvedValue({ valid: true });
      mockUsersService.findByEmail.mockResolvedValue(null);
      await expect(service.resetPassword({ email: 'a', password: 'b', code: '123' } as any)).rejects.toThrow(BadRequestException);
    });
    it('should reset password and return message', async () => {
      mockVerificationService.verifyCode.mockResolvedValue({ valid: true });
      mockUsersService.findByEmail.mockResolvedValue({ userId: 'id' });
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt' as unknown as never);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as unknown as never);
      mockUsersService.updatePassword.mockResolvedValue({});
      const result = await service.resetPassword({ email: 'a', password: 'b', code: '123' } as any);
      expect(result).toEqual({ message: '密码重置成功' });
    });
  });
});
