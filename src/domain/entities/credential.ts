import * as Joi from 'joi';
import { BadRequestException } from '../../domain/http/errors';

export class Credential {
  constructor(public user: string, public password: string) {
    this.validate();
  }

  private validate(): void {
    const schema = Joi.object().keys({
      user: Joi.string().required(),
      password: Joi.string().required(),
    }).required();

    const { error } = schema.validate({ user: this.user, password: this.password });
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}



