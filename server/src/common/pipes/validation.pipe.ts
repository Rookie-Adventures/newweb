import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    try {
      const object = plainToInstance(metatype as ClassConstructor<unknown>, value);
      const errors = await validate(object as object);

      if (errors.length > 0) {
        const messages = this.formatErrors(errors);

        throw new BadRequestException({
          statusCode: 400,
          message: '请求参数验证失败',
          errors: messages,
        });
      }

      return value;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('验证过程中发生错误');
    }
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): string {
    return errors
      .map((err) => {
        const constraints = err.constraints || {};
        return Object.values(constraints).join(', ');
      })
      .join('; ');
  }
}
