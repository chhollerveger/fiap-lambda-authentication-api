import * as Joi from 'joi';
import { SessionResponseDto } from 'src/domain/dtos/session-response-dto';
import { BadRequestException } from 'src/domain/http/errors';

export class Session {
  constructor(public accessToken: string) {
    this.validate()
  }

  private validate(): void {
    const schema = Joi.object().keys({
      accessToken: Joi.string().required(),
    }).required();

    const { error } = schema.validate({ accessToken: this.accessToken });
    if (error) {
      throw new BadRequestException(error.message);
    }
  }

  public toResponse(): SessionResponseDto {
    return {
      accessToken: this.accessToken
    }
  }
}