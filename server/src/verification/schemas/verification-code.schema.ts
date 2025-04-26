import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type VerificationCodeDocument = VerificationCode & Document;

@Schema({
  timestamps: true,
  collection: 'verification_codes',
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
export class VerificationCode {
  @ApiProperty({ description: '验证码ID' })
  @Prop({ required: true, unique: true })
  codeId: string = '';

  @ApiProperty({ description: '验证码' })
  @Prop({ required: true })
  code: string = '';

  @ApiProperty({ description: '验证目标（邮箱或手机号）' })
  @Prop({ required: true })
  target: string = '';

  @ApiProperty({ description: '验证类型（email或sms）' })
  @Prop({ required: true, enum: ['email', 'sms'] })
  type: string = 'email';

  @ApiProperty({ description: '验证目的（register, login, reset_password等）' })
  @Prop({ required: true })
  purpose: string = 'register';

  @ApiProperty({ description: '过期时间' })
  @Prop({ type: Date, required: true })
  expiresAt: Date = new Date();

  @ApiProperty({ description: '是否已使用' })
  @Prop({ default: false })
  isUsed: boolean = false;

  @ApiProperty({ description: '使用时间' })
  @Prop({ type: Date })
  usedAt: Date = new Date();

  @ApiProperty({ description: '创建时间' })
  createdAt?: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt?: Date;
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode);
