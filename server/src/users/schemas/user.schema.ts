import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  collection: 'users', // 确保与 LibreChat 使用相同的集合名
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  @ApiProperty({ description: '用户唯一标识' })
  @Prop({ required: true, unique: true })
  userId: string;

  @ApiProperty({ description: '用户邮箱' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: '用户密码', writeOnly: true })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: '用户名' })
  @Prop()
  username: string;

  @ApiProperty({ description: '用户姓名' })
  @Prop()
  name: string;

  @ApiProperty({ description: '用户角色', default: 'user' })
  @Prop({ default: 'user' })
  role: string;

  @ApiProperty({ description: '会员等级', default: 'free' })
  @Prop({ default: 'free' })
  membershipLevel: string;

  @ApiProperty({ description: '会员过期时间' })
  @Prop({ type: Date })
  membershipExpiry: Date;

  @ApiProperty({ description: '是否激活', default: false })
  @Prop({ default: false })
  isActive: boolean;

  @ApiProperty({ description: '用户资料' })
  @Prop({ type: Object, default: {} })
  profile: Record<string, any>;

  @ApiProperty({ description: '用户权限列表' })
  @Prop({ type: [String], default: [] })
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
