import pushToS3 from './builds/pushToS3';

async function deployToDemo(): Promise<string> {
  const NEW_TAG: string = process.env.BRANCH_NAME;

  console.log(NEW_TAG, 'All files will be uploaded to here');

  if (!NEW_TAG) {
    console.error('Deploy to demo job needs branch name from JenkinsFile!');
    return;
  }

  await pushToS3(NEW_TAG);
  return await Promise.resolve('ALL TASKS ARE DONE!!!!!!!!!!!!!!');
}

deployToDemo()
  .then((res) => {
    console.log(res);
  });
