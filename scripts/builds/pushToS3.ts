import * as DeployConfig from "./config";
const s3 = require("s3");

export default function pushToS3(NEW_TAG: string, isProd?: boolean) {
  console.log("Start to upload bundled javascript files to S3");

  const s3Client = s3.createClient(DeployConfig.S3_CLIENT_OPTIONS);

  let uploader: DeployConfig.IS3ClientUploaderOptions;

  return new Promise((resolve, reject) => {
    if (isProd) {
      uploader = s3Client.uploadFile({
        localFile: DeployConfig.VERSION_FILE_PATH,
        s3Params: {
          Bucket: DeployConfig.AWS_S3_BUCKET,
          Key: `${DeployConfig.AWS_S3_FOLDER_PREFIX}/${DeployConfig.VERSION_FILE_NAME}`,
          CacheControl: "public, max-age=604800",
          ACL: "public-read",
        },
      });
    } else {
      uploader = s3Client.uploadDir({
        localDir: DeployConfig.APP_DEST,
        s3Params: {
          Bucket: DeployConfig.AWS_S3_BUCKET,
          Prefix: `${DeployConfig.AWS_S3_FOLDER_PREFIX}/${NEW_TAG}`,
          CacheControl: "public, max-age=604800",
          ACL: "public-read",
        },
      });
    }

    uploader.on("error", (err: Error) => {
      console.error("unable to sync:", err.stack);
      reject(err);
    });
    uploader.on("progress", () => {
      console.log("progress", uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on("end", () => {
      console.log("END to upload dist files to S3");
      resolve();
    });
  })
    .catch((err) => {
      console.error(err);
    });
}
