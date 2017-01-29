# React-isomorphic-serverless-typescript

This project is the starter kit fot the who wants to use ReactJS isomorphic-rendering with AWS Lambda.

**PLEASE! contribute this project with me!**

If you want to contribute this package, please feel free to making PR.
I have the full time job now, so I don't have very much time now T_T


I used serveral libraries to make these posiible.

 **Packages**
- **TypeScript** - basic language
- **ReactJS** - front-end framework and make isomorphic-rendering
- **Redux** - App state manager
- **Serverless** - managing AWS Lambda, API Gateway, etc...
- **Yarn** - package mangaer(optional)

# How to install
```
git clone https://github.com/TylorShin/react-isomorphic-serverless-typescript.git
cd react-isomorphic-serverless-typescript
npm install
```
*(yarn is also possible)*

# How to use
**Running dev server**
```
npm run dev
```

**Build production script**
```
npm run build-prod
```

# deploy process
1. Make and Apply new git tag for SCM and destination path.
2. Make bundled JS files for server-side and browser-side.
3. Upload bundled JS files to S3 and Remove browser side bundled JS.
4. Copy package.json that only for serverless to dist folder.
5. Install all packages in dist folder and zip them with bundled JS.
6. Deploy Lambda and relevant packages by using serverless

**Deploy to lambda staging server**
```
WIP
```

**Deploy to lambda production server**
```
WIP
```

# Todos
- **Adding TEST**
- **Minimizing node_modules size**
- **Handling independent CSS with precompiler like sass**
- **Apply ImmutbaleJS**
- GraphQL?
