import { HttpResponse, HttpResponseCreator } from "src/domain/http/http-response";
import { IController } from "../../domain/contracts/controller";
import { LoginRequestDto } from "src/domain/dtos/login-request-dto";
import { LoginUseCase } from "src/domain/contracts/login-use-case";
import { StatusCodes } from "http-status-codes";

export class LoginController implements IController {
  constructor(
    private loginUseCase: LoginUseCase
  ) { }

  async execute(body: string): Promise<HttpResponse> {
    try {
      const request: LoginRequestDto = JSON.parse(body);
      const response = await this.loginUseCase.execute(request);
      return HttpResponseCreator.success(StatusCodes.OK, response);
    } catch (error) {
      return HttpResponseCreator.error(error);
    }
  }
}