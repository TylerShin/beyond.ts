## Installation

### Clone repository
```
git clone https://github.com/TylorShin/react-universal-in-serverless.git
cd react-universal-in-serverless
npm install
```

### Make additional S3 Bucket
You need S3 bucket to store bundled javascript file bundled for a browsers.
(If you can connect this with a CDN like Cloudfront, the script loading speed will be much better. But you should change some code in deploy logic and normal logic too.)
If you are interested in this, read [advanced settings](/docs/advancedsettings)


So, here is what you should do.
1. Create S3 bucket.

![create S3](https://s3.amazonaws.com/serverless-react-tylor-app-assets/Screenshot+from+2017-03-15+20-04-18.png)

2. Give READ permission to everyone
![set s3 bucket permission](https://s3.amazonaws.com/serverless-react-tylor-app-assets/Screenshot+from+2017-03-15+20-06-49.png)

After that Set S3 Bucket information in <root_directory>/scripts/builds/config.

Below one is example and default setting.

```
// <root_directory>/scripts/builds/configs
export const AWS_S3_BUCKET: string = "serverless-react-tylor-app";
export const AWS_S3_FOLDER_PREFIX: string = "react-app";
```

