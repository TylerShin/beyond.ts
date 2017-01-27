const childProcess = require('child_process');

const exec = childProcess.exec;

export default function removeGitTag(tag: string) {
  console.log('Removing git tag task is started!');
  return new Promise((resolve, reject) => {
    exec(`
      git tag -d ${tag}
    `, { maxBuffer: 1024 * 1024 * 30 /* 30MB */}, (err: Error) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('Removing git tag task is done!');
        resolve();
      }
    });
  });
}
