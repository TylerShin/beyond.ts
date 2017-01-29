import * as Base from './lambdaBase';

// Event
export interface Event extends Base.Event{
  resource?: string;
  path?: string;
  httpMethod?: string;
  headers: EventHeaders;
  queryStringParameters: EventQueryStringParameters;
  pathParameters?: EventPathParameters;
  stageVariables?: EventStageVariables;
  requestContext?: {
    "accountId": string;
    "resourceId": string;
    "stage": string;
    "requestId": string;
    "identity": {
      "cognitoIdentityPoolId": any;
      "accountId": any;
      "cognitoIdentityId": any;
      "caller": any;
      "apiKey": any;
      "sourceIp": string,
      "accessKey": any;
      "cognitoAuthenticationType": any;
      "cognitoAuthenticationProvider": any;
      "userArn": any;
      "userAgent": string;
      "user": any;
    }
    "resourcePath": string;
    "httpMethod": string;
    "apiId": string;
  };
  body?: string;
}

export interface EventHeaders {
  "Accept"?: string;
  "Accept-Encoding"?: string;
  "Accept-Language"?: string;
  "CloudFront-Forwarded-Proto"?: string;
  "CloudFront-Is-Desktop-Viewer"?: string;
  "CloudFront-Is-Mobile-Viewer"?: string;
  "CloudFront-Is-SmartTV-Viewer"?: string;
  "CloudFront-Is-Tablet-Viewer"?: string;
  "CloudFront-Viewer-Country"?: string;
  "Host"?: string;
  "Upgrade-Insecure-Requests"?: string;
  "User-Agent"?: string;
  "Via"?: string;
  "X-Amz-Cf-Id"?: string;
  "X-Forwarded-For"?: string;
  "X-Forwarded-Port"?: string;
  "X-Forwarded-Proto"?: string;
  "original-uri"?: string;
  "original-host"?: string;
}

export interface EventQueryStringParameters {
  [key: string]: string;
}

export interface EventPathParameters {
  [key: string]: string;
}

export interface EventStageVariables {
  [key: string]: string;
}


// Response
export interface Response extends Base.Response {
  statusCode: number;
  headers: {
    'Content-Type'?: string;
    Location?: string;
  };
  body?: string;
}

export interface Context extends Base.Context<Response> {}
