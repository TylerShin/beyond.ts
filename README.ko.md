# react-universal-in-serverless

이 프로젝트는 AWS Lambda를 사용해서 NodeJS 서버 없이 Universal(Isomorphic) rendering을 지원하는 ReactApp을 만들기 위한 starter kit 입니다.

[데모와 문서](https://d3ujodob71n39b.cloudfront.net)를 보면 더 자세히 확인하실 수 있습니다.

사용한 주요 의존성 라이브러리들은 다음과 같습니다.

- **TypeScript** - 주요 언어
- **ReactJS** - Frontend library
- **Redux** - 상태 매니저 (State manager)
- **Serverless** - AWS Lambda를 관리하는 Framework


# 시작하기 전에
*이 프로젝트는 무료가 아닙니다. AWS 계정이 Free Tier라도 요금이 청구될 수 있습니다. Lambda, S3, API Gateway, CloudFront, CloudFormation, Route53 등의 요금을 확인하고 사용하는 것을 추천합니다.*

1. AWS Credential 설정
AWS에 필요한 서비스들을 등록하기 위해서 AWS Credential 설정이 필요합니다.
[Serverless AWS Credential 설정 가이드](https://serverless.com/framework/docs/providers/aws/guide/credentials/)를 참조하여 먼저 계정 설정을 해주세요.

2. S3 Bucket 만들기 (bundled JS나 asset들을 위해서)
serverless.yml을 통해서도 만들 수 있지만, 명시적으로 하나 더 만들어 두는 것이 이후 관리에 편한 경우가 많아서 CloudFormation 외부의 버킷을 하나 더 사용하도록 설정했습니다.
아래와 같은 순서로 설정해주세요.

- 빈 S3 버킷을 하나 만듭니다(Public Read Permission을 줍니다)(CloudFront 같은 CDN과 연결시킬 수 있으면 더 좋습니다.)
- <root_directory>/scripts/builds/config.ts 파일에 해당 버킷에 대한 정보를 입력합니다.

# 설치 방법
```
// bash
$ git clone https://github.com/TylorShin/react-universal-in-serverless.git
$ cd react-universal-in-serverless
$ npm install
```

### 사용 방법
**개발용 서버 작동하기**
```
npm run dev
```
이후 웹 브라우저에서 localhost:8080 이나 0.0.0.0:8080 으로 접속.

### 배포하기
**반드시 상단의 AWS Credential 설정을 미리 해야합니다.**

*Staging에 배포하기*
```
npm run deploy:stage
```

*Production에 배포하기*
```
npm run deploy:prod
```

### 서버로그 확인하기(Serverless 공식 문서 참조)
```
$ npm i -g serverless
$ serverless logs -f [function name] -s [stage name]
```

```
ex) $ serverless logs -f ssr -s stage
```

로그를 한 번만 보는 게 아니라, 계속해서 실시간으로 보고 싶으면 -t 옵션을 붙이면 됩니다.
```
serverless logs -f [function name] -s [stage name] -t
```

# 배포 과정
1. 새로운 Git Tag를 만들어서 적용시키고 배포할 path로 만듭니다.
2. Webpack을 사용해서 server용, client용 bundled JS를 각각 만듭니다.
3. 만들어진 JS파일들을 S3에 업로드시키고, 필요 없는 browser용 js파일은 로컬 머신에서 삭제합니다.
4. Serverless 만을 위한 package.json을 dist 폴더로 복사합니다.
5. Serverless를 위해 필요한 npm package들을 전부설치하고 zip파일로 압축합니다.
6. Serverless를 통해 service deploy를 합니다.


# 앞으로 할 일
- **Adding TEST**
- **Minimizing node_modules size**
- **Handling independent CSS with precompiler like sass**
