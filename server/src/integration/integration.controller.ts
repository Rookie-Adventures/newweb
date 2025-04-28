import { 
  Controller, 
  All, 
  Req, 
  Res, 
  UseGuards,
  Param,
  Body,
  Headers,
  HttpStatus,
  HttpException,
  Logger
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IntegrationService } from './integration.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('integration')
export class IntegrationController {
  private readonly logger = new Logger(IntegrationController.name);

  constructor(
    private readonly integrationService: IntegrationService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * LibreChat API代理
   * 将前端请求转发到LibreChat服务，同时处理用户同步和认证
   */
  @All('librechat/*pathPart')
  @UseGuards(JwtAuthGuard)
  async proxyLibreChat(
    @Req() req: Request,
    @Res() res: Response,
    @Param('pathPart') path: string,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    const user = req.user;
    
    try {
      // 确保用户在LibreChat系统中存在
      await this.integrationService.ensureUserInLibreChat(user);
      
      // 构建请求URL
      const libreChatApiUrl = this.configService.get<string>('LIBRECHAT_API_URL', 'http://localhost:3100');
      const targetUrl = `${libreChatApiUrl}/api/${path}`;
      
      // 构建请求头，替换认证信息
      const requestHeaders = { ...headers };
      delete requestHeaders.host;
      delete requestHeaders.connection;
      
      // 使用与LibreChat兼容的JWT
      requestHeaders.authorization = `Bearer ${this.integrationService.generateLibreChatToken(user)}`;
      
      // 发送代理请求
      const response = await axios({
        method: req.method,
        url: targetUrl,
        headers: requestHeaders,
        data: req.method !== 'GET' ? body : undefined,
        params: req.query,
        responseType: 'arraybuffer', // 支持二进制响应，如文件下载
      });
      
      // 设置响应头
      Object.keys(response.headers).forEach(key => {
        res.setHeader(key, response.headers[key]);
      });
      
      // 返回响应
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`LibreChat代理请求失败: ${error.message}`);
      
      // 处理错误响应
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorData = error.response?.data 
        ? error.response.data.toString() 
        : '代理请求失败';
      
      throw new HttpException(errorData, status);
    }
  }

  /**
   * 健康检查
   * 检查与LibreChat的连接是否正常
   */
  @All('librechat/health')
  async healthCheck(@Res() res: Response) {
    try {
      const libreChatApiUrl = this.configService.get<string>('LIBRECHAT_API_URL', 'http://localhost:3100');
      const response = await axios.get(`${libreChatApiUrl}/api/health`);
      return res.status(HttpStatus.OK).json({
        status: 'ok',
        libreChatHealth: response.data,
      });
    } catch (error) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        status: 'error',
        message: 'LibreChat服务不可用',
        error: error.message,
      });
    }
  }
} 