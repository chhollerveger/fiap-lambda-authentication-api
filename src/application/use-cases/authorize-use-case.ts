import { AuthenticationRepository } from "src/domain/contracts/authentication-repository";
import { AuthorizeUseCase } from "src/domain/contracts/authorize-use-case";
import { AuthorizeRequestDto } from "src/domain/dtos/authorize-request-dto";
import { Session } from "src/domain/entities/session";

export class AuthorizeUseCaseImpl implements AuthorizeUseCase {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository
  ) { }

  public async execute(request: AuthorizeRequestDto): Promise<void> {
    const session = new Session(request.accessToken)
    await this.authenticationRepository.authorize(session)
  }
}