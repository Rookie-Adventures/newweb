import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  beforeEach(() => {
    mockUserModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      findOneAndUpdate: jest.fn(),
      deleteOne: jest.fn(),
    };
    service = new UsersService(mockUserModel as any);
  });

  describe('create', () => {
    it('should throw if email exists', async () => {
      mockUserModel.findOne.mockResolvedValueOnce({});
      await expect(service.create({ email: 'a', password: 'b', username: 'u' } as any)).rejects.toThrow(ConflictException);
    });
    it('should create new user', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      const save = jest.fn().mockResolvedValue('saved');
      mockUserModel.constructor = function (doc: any) { Object.assign(this, doc); this.save = save; };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as unknown as never);
      const result = await service.create({ email: 'a', password: 'b', username: 'u' } as any);
      expect(result).toBe('saved');
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      mockUserModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(['user']) });
      const result = await service.findAll();
      expect(result).toEqual(['user']);
    });
  });

  describe('findOne', () => {
    it('should throw if not found', async () => {
      mockUserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('id')).rejects.toThrow(NotFoundException);
    });
    it('should return user if found', async () => {
      mockUserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({ userId: 'id' }) });
      const result = await service.findOne('id');
      expect(result.userId).toBe('id');
    });
  });

  describe('findByEmail', () => {
    it('should return user or null', async () => {
      mockUserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue('user') });
      const result = await service.findByEmail('a');
      expect(result).toBe('user');
    });
  });

  describe('update', () => {
    it('should hash password if present', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as unknown as never);
      mockUserModel.findOneAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue({ userId: 'id' }) });
      const result = await service.update('id', { password: 'p' } as any);
      expect(result.userId).toBe('id');
    });
    it('should throw if not found', async () => {
      mockUserModel.findOneAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('id', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should throw if not found', async () => {
      mockUserModel.deleteOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({ deletedCount: 0 }) });
      await expect(service.remove('id')).rejects.toThrow(NotFoundException);
    });
    it('should resolve if deleted', async () => {
      mockUserModel.deleteOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({ deletedCount: 1 }) });
      await expect(service.remove('id')).resolves.toBeUndefined();
    });
  });

  describe('validateUser', () => {
    it('should return null if user not found', async () => {
      service.findByEmail = jest.fn().mockResolvedValue(null);
      const result = await service.validateUser('a', 'b');
      expect(result).toBeNull();
    });
    it('should return null if password invalid', async () => {
      service.findByEmail = jest.fn().mockResolvedValue({ password: 'hashed' });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as unknown as never);
      const result = await service.validateUser('a', 'b');
      expect(result).toBeNull();
    });
    it('should return user data if valid', async () => {
      service.findByEmail = jest.fn().mockResolvedValue({ password: 'hashed', toObject: () => ({ userId: 'id', password: 'hashed' }) });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as unknown as never);
      const result = await service.validateUser('a', 'b');
      expect(result).toHaveProperty('userId', 'id');
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('updateMembership', () => {
    it('should update membership and return user', async () => {
      mockUserModel.findOneAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue({ userId: 'id' }) });
      const result = await service.updateMembership('id', 'VIP', new Date());
      expect(result.userId).toBe('id');
    });
    it('should throw if not found', async () => {
      mockUserModel.findOneAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.updateMembership('id', 'VIP')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePassword', () => {
    it('should throw if user not found', async () => {
      mockUserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.updatePassword('id', 'hashed')).rejects.toThrow(NotFoundException);
    });
    it('should update password and save', async () => {
      const save = jest.fn().mockResolvedValue({ userId: 'id', password: 'hashed' });
      mockUserModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({ save }) });
      const result = await service.updatePassword('id', 'hashed');
      expect(result).toHaveProperty('userId', 'id');
      expect(result).toHaveProperty('password', 'hashed');
    });
  });
});
