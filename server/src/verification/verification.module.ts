import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { VerificationCode, VerificationCodeSchema } from './schemas/verification-code.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VerificationCode.name, schema: VerificationCodeSchema }]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
