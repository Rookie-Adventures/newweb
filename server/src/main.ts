import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 安全配置
  app.use(helmet());
  app.enableCors();

  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 文档配置
  const config = new DocumentBuilder()
    .setTitle('Shinegold API')
    .setDescription('Shinegold 主站 API 文档')
    .setVersion('1.0')
    .addTag('auth', '认证相关接口')
    .addTag('users', '用户相关接口')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 启动服务器
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`应用已启动，访问: http://localhost:${port}`);
  console.log(`API 文档地址: http://localhost:${port}/api/docs`);
}

// 确保 Promise 被正确处理
bootstrap().catch(err => {
  console.error('启动应用时发生错误:', err);
  process.exit(1);
});
