# fiap-lambda-authentication-api

## GitHub Actions

GitHub Actions allows you to automate, customize, and execute software development workflows directly in your GitHub repository.

## Prerequisites

- An AWS account
- Create an IAM user in AWS with the following permissions:
  - IAMFullAccess
  - AmazonS3FullAccess
  - CloudWatchFullAccess
  - AWSCloudFormationFullAccess
  - AWSLambda_FullAccess
  - AmazonAPIGatewayInvokeFullAccess
  - AmazonCognitoDeveloperAuthenticatedIdentities
- Securely store the AWS user access key and secret access key

## Adding Secrets to GitHub

1. Access the settings of your forked repository on GitHub.
2. Click on "Secrets" in the left sidebar and then on "New repository secret".
3. Add your AWS API key and secret access key as secrets (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`).

## Starting the Workflow

After adding your secrets, commit your changes locally and push them to GitHub. The workflow will start automatically, and you can monitor its progress in the "Actions" tab of your repository.
