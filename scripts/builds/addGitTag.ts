const childProcess = require('child_process');

const exec = childProcess.exec;

export default function addGitTag(NEW_TAG: string) {
  console.log('Adding git tag task is started!');
  return new Promise((resolve, reject) => {
    exec(`
      git tag -a ${NEW_TAG} -m "Trying to deploy to S3"
    `, { maxBuffer: 1024 * 1024 * 30 /* 30MB */}, (err: Error) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('Adding git tag task is done!');
        resolve();
      }
    });
  });
}
