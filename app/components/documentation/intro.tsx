import * as React from "react";
// styles
import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./intro.scss");

interface IIntroDocumentationComponentProps {}

@withStyles<typeof IntroDocumentationComponent>(styles)
export default class IntroDocumentationComponent extends React.PureComponent<IIntroDocumentationComponentProps, {}> {
  public render() {
    return (
      <div>
        <h1 className={styles.header}>Why Serverless? and Why Universal Rendering?</h1>
        <div className={styles.content}>
          <h2>Why Serverless?</h2>
          When you make independent nodeJS server as one of the Microservice,
          for <i>server side rendering</i> or <i>universal rendering(isomorphic rendering)</i>,
          you should care about next things.
          <ul>
            <li>Auto scalability</li>
            <li>Speed</li>
            <li>Price</li>
            <li>Security</li>
            <li>Secureness</li>
          </ul>

          But making and maintaining that things are very annoying.
          Especially, if you are front-end enginner, it's more than adventure. <br />

          However, luckily we can use Cluod Functions(AWS Lambda, Google cloud functions, etc ...) now. <br />
          Furthermore, in AWS Lambda, now we can dynamically control HTTP response header in the Lambda function code. <br />

          <h2>Why Serverless Framework?</h2>
          Serverless is Framework that support using cloud functions like AWS Lambda. <br />
          <small>(Fron now, I'll use AWS Lambda as cloud functions term. because we will use Lambda)</small> <br />
          It really helps you when you have to control the several services related with Lambda. <br />
          For example, in our project you have to control S3, IAM, CloudFront, API Gateway, Lambda,
          ...and the other things. <br />
          Imagine that control them individually at many browser tabs. <br />
          It's definitely hell and also very easy to make mistakes.
          So, as a common programmer you may want to avoid this situation. <br />
          <b>Serverless</b> solve this problem with AWS CloudFormation. by grouping the lambda related services as one.
        </div>
      </div>
    );
  }
}
