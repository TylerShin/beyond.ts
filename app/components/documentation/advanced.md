## Make browser side bundled JS load faster
There are two way to do accelerate JS loading speed. But almost every case, I recommend first one.

1. Attach CDN service.   
You can add CDN service to use cache from the edge servers. There are many CDN service providers(Akamai, CloudFlare, ETC...). It doesn't matter what provider you choose.   
Just choose one and change server side rendering code.
```typescript
// <root_directory>/app/server.tsx
const bundledJsForBrowserPath = `https://s3.amazonaws.com/${DeployConfig.AWS_S3_BUCKET}/${DeployConfig.AWS_S3_FOLDER_PREFIX}/${version}/bundleBrowser.js`;
```

2. Turn on S3 Transfer acceleration mode.  
This is **not recommended way** to speed up your service. However, if your service has very small amount of users and traffc, it can be temporary solution.  

- Just turn on the Tansfer acceleration option.
![s3 Transfer acceleration](https://s3.amazonaws.com/serverless-react-tylor-app-assets/Screenshot+from+2017-03-15+20-07-56.png)

- Change server side rendering code like above upon given URL.
