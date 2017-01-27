import addGitTag from './builds/addGitTag';
import pushToS3 from './builds/pushToS3';
import pushGitTag from './builds/pushGitTag';
import recordGitTag from './builds/recordGitTag';

async function deployToStage(): Promise<string> {
  const NEW_TAG: string = (new Date()).toISOString().replace(/:/g, '-');

  await addGitTag(NEW_TAG);
  await pushGitTag();
  await pushToS3(NEW_TAG);
  await recordGitTag(NEW_TAG);
  return await Promise.resolve('ALL TASKS ARE DONE!');
}

deployToStage()
  .then((res) => {
    console.log(res);
  });
