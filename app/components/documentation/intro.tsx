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
          <small>(From now, I'll use AWS Lambda as cloud functions term. because we will use Lambda)</small> <br />
          It really helps you when you have to control the several services related with Lambda. <br />
          For example, in our project you have to control S3, IAM, CloudFront, API Gateway, Lambda,
          ...and the other things. <br />
          Imagine that control them individually at many browser tabs. <br />
          It's definitely hell and also very easy to make the mistakes.
          So, as a common programmer you may want to avoid this situation. <br />
          <b>Serverless</b> solved this problem with AWS CloudFormation by grouping the lambda related services.

          <h2>Why Universal rendering</h2>
          The almost every modern javascript front-end frameworks do client-side renderig. But Client-Side Rendering has 2 problems. <br />
          <b>First, lazy initial rendering.</b> <br />
          User can't see a page content until finishing loading javascript file. <br />
          <b>Second, the SEO problem</b> <br />
          The crawler can't get data because they are not able to execute javascript. Google's bot can execute javascript though, <br />
          The results weight are less than normal document. If you want to know more about this, just visit <a href="http://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157">here</a>.
          <br />
          Universal rendering is the ideal solution of above problems.<br />
          When NodeJS executable server gets user's request, the server run our reactJS javascript file and render the page following by the user's request. <br />
          Then, the server makes response with rendered result document. 
          <b>The best important thing is here</b> <br />
          The result document has script tag that request get bundled javascript.
          <blockquote>&lt;script src="https://www.example.com/bundled.js" &gt;&lt;/script&gt;</blockquote>
          
          After all, the user get rendered document before loading javascript file(solve slow initial rendering problem) and load jaavascript after. <br />
          And the result document has the rendered data, the crawler's can grab the page's data. (solve SEO problem)
        </div>
      </div>
    );
  }
}
