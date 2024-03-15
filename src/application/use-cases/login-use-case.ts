import { Credential } from "src/domain/entities/credential";
import { LoginUseCase } from "src/domain/contracts/login-use-case";
import { AuthenticationRepository } from "src/domain/contracts/authentication-repository";
import { LoginRequestDto } from "src/domain/dtos/login-request-dto";
import { SessionResponseDto } from "src/domain/dtos/session-response-dto";

export class LoginUseCaseImpl implements LoginUseCase {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository
  ) { }

  public async execute(request: LoginRequestDto): Promise<SessionResponseDto> {
    const credential = new Credential(request.user, request.password)
    const session = await this.authenticationRepository.authenticate(credential)
    return session.toResponse();
  }
}