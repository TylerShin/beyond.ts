import * as fs from "fs-extra";

export default function recordGitTag(NEW_TAG: string) {
  return new Promise((resolve, reject) => {
    fs.outputFile("temp/version", NEW_TAG, (err: Error) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve();
    });
  });
}
