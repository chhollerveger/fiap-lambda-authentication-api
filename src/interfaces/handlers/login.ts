import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { LoginUseCaseImpl } from "src/application/use-cases/login-use-case";
import { makeAwsCognitoClientProvider } from "src/infrastructure/clients/aws/factories/aws-cognito-client-provider-factory";
import { CognitoAuthenticationRepository } from "src/infrastructure/repositories/cognito-authentication-repository";
import { LoginController } from "src/interfaces/controllers/login-controller";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const clientProviderFactory = makeAwsCognitoClientProvider();
  const authenticationRepository = new CognitoAuthenticationRepository(clientProviderFactory);
  const loginUseCase = new LoginUseCaseImpl(authenticationRepository);
  const controller = new LoginController(loginUseCase);
  return controller.execute(event.body);
}