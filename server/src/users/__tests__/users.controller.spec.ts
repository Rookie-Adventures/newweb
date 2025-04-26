import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: any;

  beforeEach(async () => {
    mockUsersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      updateMembership: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const users = [{ userId: '1', username: 'test' }];
    mockUsersService.findAll.mockResolvedValueOnce(users);
    const result = await controller.findAll();
    expect(result).toEqual(users);
  });

  it('should throw error when findAll fails', async () => {
    mockUsersService.findAll.mockRejectedValueOnce(new Error('DB error'));
    await expect(controller.findAll()).rejects.toThrow('DB error');
  });

  it('should return one user', async () => {
    const user = { userId: '1', username: 'test' };
    mockUsersService.findOne.mockResolvedValueOnce(user);
    const result = await controller.findOne('1');
    expect(result).toEqual(user);
  });

  it('should throw error when findOne fails', async () => {
    mockUsersService.findOne.mockRejectedValueOnce(new Error('DB error'));
    await expect(controller.findOne('userId')).rejects.toThrow('DB error');
  });

  it('should create a user', async () => {
    const dto = { username: 'test' };
    const created = { userId: '1', username: 'test' };
    mockUsersService.create.mockResolvedValueOnce(created);
    const result = await controller.create(dto as any);
    expect(result).toEqual(created);
  });

  it('should throw error when create fails', async () => {
    mockUsersService.create.mockRejectedValueOnce(new Error('DB error'));
    await expect(controller.create({} as any)).rejects.toThrow('DB error');
  });

  it('should update a user', async () => {
    const dto = { username: 'new' };
    const updated = { userId: '1', username: 'new' };
    mockUsersService.update.mockResolvedValueOnce(updated);
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(updated);
  });

  it('should throw error when update fails', async () => {
    mockUsersService.update.mockRejectedValueOnce(new Error('DB error'));
    await expect(controller.update('userId', {} as any)).rejects.toThrow('DB error');
  });

  it('should remove a user', async () => {
    mockUsersService.remove.mockResolvedValueOnce({ deleted: true });
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw error when remove fails', async () => {
    mockUsersService.remove.mockRejectedValueOnce(new Error('DB error'));
    await expect(controller.remove('userId')).rejects.toThrow('DB error');
  });

  it('should update membership', async () => {
    const body = { membershipLevel: 'VIP', expiryDate: new Date() };
    const updated = { userId: '1', membershipLevel: 'VIP' };
    mockUsersService.updateMembership.mockResolvedValueOnce(updated);
    const result = await controller.updateMembership('1', body as any);
    expect(result).toEqual(updated);
  });

  it('should throw error when updateMembership fails', async () => {
    mockUsersService.updateMembership.mockRejectedValueOnce(new Error('DB error'));
    await expect(controller.updateMembership('userId', { membershipLevel: 'VIP', expiryDate: new Date() } as any)).rejects.toThrow('DB error');
  });
});
