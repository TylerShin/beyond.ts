import * as fs from "fs";
import addGitTag from "./builds/addGitTag";
import pushToS3 from "./builds/pushToS3";
import removeGitTag from "./builds/removeGitTag";
import recordGitTag from "./builds/recordGitTag";
import { DEPLOY_VERSION, PRODUCTION_GIT_TAG, VERSION_FILE_PATH } from "./builds/config";

async function deployToProd(): Promise<string> {
  fs.writeFileSync(VERSION_FILE_PATH, DEPLOY_VERSION);

  await removeGitTag(PRODUCTION_GIT_TAG);
  await addGitTag(PRODUCTION_GIT_TAG);
  await pushToS3(DEPLOY_VERSION, true);
  await recordGitTag(PRODUCTION_GIT_TAG);
  return await Promise.resolve("ALL TASKS ARE DONE!");
}

deployToProd()
  .then((res) => {
    console.log(res);
  });
