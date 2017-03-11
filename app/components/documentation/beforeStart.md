## Before Start

This is **not free** to start. Because it uses AWS's several services(Lambda, API Gateway, S3, CloudFront, CloudFormation, ...)

### Set AWS Credential 
You should set AWS IAM Role and account setting.  
Visit below guide and precede AWS settings before run deploying script
[Serverless AWS account setting guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Make additional S3 Bucket
You need S3 bucket to store bundled javascript file bundled for a browsers.
(If you can connect this with a CDN like Cloudfront, the script loading speed will be much better. But you should change some code in deploy logic and normal logic too.)

After that Set S3 Bucket information in <root_directory>/scripts/builds/config.

```typescript
export const AWS_S3_BUCKET: string = "serverless-react-tylor-app";
export const AWS_S3_FOLDER_PREFIX: string = "react-app";
```
