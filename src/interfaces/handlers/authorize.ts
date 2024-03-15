import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { AuthorizeUseCaseImpl } from "src/application/use-cases/authorize-use-case";
import { makeAwsCognitoClientProvider } from "src/infrastructure/clients/aws/factories/aws-cognito-client-provider-factory";
import { CognitoAuthenticationRepository } from "src/infrastructure/repositories/cognito-authentication-repository";
import { AuthorizeController } from "src/interfaces/controllers/authorize-controller";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const clientProviderFactory = makeAwsCognitoClientProvider();
  const authenticationRepository = new CognitoAuthenticationRepository(clientProviderFactory);
  const authorizeUseCase = new AuthorizeUseCaseImpl(authenticationRepository);
  const controller = new AuthorizeController(authorizeUseCase);
  return controller.execute(event.body);
}