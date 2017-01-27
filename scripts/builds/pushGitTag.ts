const childProcess = require('child_process');

const exec = childProcess.exec;

export default function pushGitTag() {
  console.log('pushing git tag task is started!');
  return new Promise((resolve, reject) => {
    exec(`
      git push origin --tags -f
    `, { maxBuffer: 1024 * 1024 * 30 /* 30MB */}, (err: Error) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('pushing git tag task is done!');
        resolve();
      }
    });
  });
}
