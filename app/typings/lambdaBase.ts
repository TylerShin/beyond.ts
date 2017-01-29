// Event
export interface Event {}
export interface Response {}

// Context

// Type definitions for AWS Lambda
// Definitions by: James Darbyshire (http://darb.io)

/************************************************
*                                               *
*               AWS Lambda API                  *
*                                               *
************************************************/

export interface ILambdaIntegrationResponse {
  statusCode: number;
  headers: {
    'Content-Type': string
  };
  body: string;
}

// Context
// http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
export interface Context<T> {
    // Properties
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: number;
    awsRequestId: string;
    logGroupName: string;
    logStreamName: string;
    identity?: CognitoIdentity;
    clientContext?: ClientContext;

    // Functions
    succeed(result?: Object): void;
    fail(error: Error): void;
    done(error: Error | null, result?: T): void; // result must be JSON.stringifyable
    getRemainingTimeInMillis(): number;
}

interface CognitoIdentity {
    cognito_identity_id: string;
    cognito_identity_pool_id: string;
}

interface ClientContext {
    client: ClientContextClient;
    Custom?: any;
    env: ClientContextEnv;
}

interface ClientContextClient {
    installation_id: string;
    app_title: string;
    app_version_name: string;
    app_version_code: string;
    app_package_name: string;
}

interface ClientContextEnv {
    platform_version: string;
    platform: string;
    make: string;
    model: string;
    locale: string;
}
