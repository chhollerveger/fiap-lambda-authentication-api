import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { AuthorizeUseCaseImpl } from "src/application/use-cases/authorize-use-case";
import { LoginUseCaseImpl } from "src/application/use-cases/login-use-case";
import { makeAwsCognitoClientProvider } from "src/infrastructure/clients/aws/factories/aws-cognito-client-provider-factory";
import { CognitoAuthenticationRepository } from "src/infrastructure/repositories/cognito-authentication-repository";
import { AuthorizeController } from "src/interfaces/controllers/authorize-controller";
import { LoginController } from "src/interfaces/controllers/login-controller";

export const authorize: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const clientProviderFactory = makeAwsCognitoClientProvider();
  const authenticationRepository = new CognitoAuthenticationRepository(clientProviderFactory);
  const authorizeUseCase = new AuthorizeUseCaseImpl(authenticationRepository);
  const controller = new AuthorizeController(authorizeUseCase);
  return await controller.execute(event.body);
}

export const login: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const clientProviderFactory = makeAwsCognitoClientProvider();
  const authenticationRepository = new CognitoAuthenticationRepository(clientProviderFactory);
  const loginUseCase = new LoginUseCaseImpl(authenticationRepository);
  const controller = new LoginController(loginUseCase);
  return await controller.execute(event.body);
}