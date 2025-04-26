import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    // 使用 IP 地址作为跟踪标识
    return Promise.resolve(req.ip || '127.0.0.1');
  }
}
