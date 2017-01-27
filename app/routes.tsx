import * as React from "react";
import * as Router from "react-router";
import { IndexRoute, Route } from "react-router";
// Import containers
import RootComponent from "./root";
import PostContainer from "./postShow";
import Status404 from "./common/components/404";
import EditorContainer from "./editor";
// import store to dispatch actions
import { appStore } from "./";
// Import API actions
import { fetchPost as fetchPostInPostShow } from "./postShow/actions";
import { fetchPost as fetchPostInEditor, createDraft } from "./editor/actions";
import { getComments } from "./comments/actions";
// heleprs
import EnvChecker from "./common/helpers/envChecker";

const CARD_ID_REGEX = /\d+/;

function extractCardId(cardId: string): string {
  return cardId.match(CARD_ID_REGEX)[0];
}

const refreshtoOldVingleElse: Router.EnterHook = (nextState, _replace, callback) => {
  if (!EnvChecker.isServer()) {
    window.location.href = `https://www.vingle.net${nextState.location.pathname}`;
  } else {
    callback();
  }
};

const refreshToOldVingleHome: Router.EnterHook = (nextState, _replace, callback) => {
  if (!EnvChecker.isServer() && nextState.location.pathname === "/") {
    window.location.href = `https://www.vingle.net${nextState.location.pathname}`;
  } else {
    callback();
  }
};

const routeMap = ([
  <Route path="/" component={RootComponent} onEnter={refreshToOldVingleHome}>
    <IndexRoute onEnter={refreshtoOldVingleElse} />
    <Route path="/posts/:cardId"
      getComponent={(nextState: Router.RouterState, callback: Function) => {
        const newCardId = extractCardId(nextState.params["cardId"]);

        if (String(appStore.getState().postShow.getIn(["post", "id"])) === newCardId) {
          callback(null, PostContainer);
          return;
        }

        appStore.dispatch(fetchPostInPostShow(newCardId))
          .catch((_e: Error) => {
            callback(null, Status404); // TODO: Add navbar to Status404
          })
          .then(appStore.dispatch(getComments({
            postId: newCardId,
            count: 5, // TODO: changed this after communicate with other teams
          }))) // TODO: add error handling for comment api error
          .then(() => { callback(null, PostContainer);; });
      }}
    />
    <Route path="/writing_form/new"
      getComponent={(_nextState: Router.RouterState, callback: Function) => {
        appStore.dispatch(createDraft())
          .catch((_e: Error) => {
            callback(null, Status404);
          })
          .then(() => { callback(null, EditorContainer); });
      }}
    />
    <Route path="/writing_form/:cardId/edit"
      getComponent={(nextState: Router.RouterState, callback: Function) => {
        const newCardId = extractCardId(nextState.params["cardId"]);

        if (String(appStore.getState().postShow.getIn(["post", "id"])) === newCardId) {
          callback(null, EditorContainer);
          return;
        }

        appStore.dispatch(fetchPostInEditor(newCardId))
          .catch((_e: Error) => {
            callback(null, Status404);
          })
          .then(() => { callback(null, EditorContainer); });
      }}
    />
    <Route path="*" onEnter={refreshtoOldVingleElse} />
  </Route>,
  <Route path="*" onEnter={refreshtoOldVingleElse} />,
]);

export default routeMap;
