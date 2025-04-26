import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

interface UserResponseData {
  userId: string;
  email: string;
  username?: string;
  name?: string;
  role: string;
  membershipLevel: string;
  [key: string]: any;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // 检查邮箱是否已存在
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException('该邮箱已被注册');
    }

    // 生成唯一的 userId
    const userId = uuidv4();

    // 密码加密
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 创建新用户
    const newUser = new this.userModel({
      userId,
      email: createUserDto.email,
      username: createUserDto.username,
      name: createUserDto.name || createUserDto.username,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException(`用户 ID ${userId} 不存在`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    // 如果更新包含密码，需要加密
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel
      .findOneAndUpdate({ userId }, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`用户 ID ${userId} 不存在`);
    }

    return updatedUser;
  }

  async remove(userId: string): Promise<void> {
    const result = await this.userModel.deleteOne({ userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`用户 ID ${userId} 不存在`);
    }
  }

  async validateUser(email: string, password: string): Promise<UserResponseData | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // 不返回密码
    const userObject = user.toObject() as UserResponseData;
    delete userObject.password;
    return userObject;
  }

  async updateMembership(
    userId: string,
    membershipLevel: string,
    expiryDate?: Date,
  ): Promise<UserDocument> {
    const updateData: { membershipLevel: string; membershipExpiry?: Date } = {
      membershipLevel,
    };

    if (expiryDate) {
      updateData.membershipExpiry = expiryDate;
    }

    const updatedUser = await this.userModel
      .findOneAndUpdate({ userId }, updateData, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`用户 ID ${userId} 不存在`);
    }

    return updatedUser;
  }

  /**
   * 更新用户密码
   * @param userId 用户ID
   * @param hashedPassword 已哈希的密码
   * @returns 更新后的用户
   */
  async updatePassword(userId: string, hashedPassword: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    user.password = hashedPassword;
    return user.save();
  }
}
