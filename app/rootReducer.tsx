import * as Redux from "redux";
import { routerReducer } from "react-router-redux";
import * as AppReducer from "./app/reducer";
import * as PostShowReducer from "./postShow/reducer";
import * as EditorReducer from "./editor/reducer";
import * as CommentsReducer from "./comments/reducer";
import * as SidebarReducer from "./common/components/sidebar/reducer";
import * as LoginModalReducer from "./common/components/loginModal/reducer";
import * as CollectionModalReducer from "./common/components/collectionModal/reducer";
import * as NotificationDropdownReducer from "./postShow/components/navbar/reducer";

export interface IAppState {
  routing?: any;
  app: AppReducer.IAppConfigState;
  postShow: PostShowReducer.IPostStateManager;
  editor: EditorReducer.IEditorStateManager;
  sidebar: SidebarReducer.ISideBarState;
  loginModal: LoginModalReducer.ILoginModalState;
  comments: CommentsReducer.ICommentStateManager;
  collectionModal: CollectionModalReducer.ICollectionModalStateManager;
  notificationDropdown: NotificationDropdownReducer.INotificationDropdownStateManager;
}

export interface IStateManager<T, S> {
  get(key: "meta"): T;
  get(key: "data"): S;

  set(key: "meta", value: T): IStateManager<T, S>;
  set(key: "data", value: S): IStateManager<T, S>;
}

export const initialState: IAppState = {
  app: AppReducer.APP_INITIAL_STATE,
  postShow: PostShowReducer.POSTSHOW_INITIAL_STATE,
  editor: EditorReducer.INITIAL_STATE,
  sidebar: SidebarReducer.SIDEBAR_INITIAL_STATE,
  loginModal: LoginModalReducer.LOGIN_MODAL_INITIAL_STATE,
  comments: CommentsReducer.COMMENTS_INITIAL_STATE,
  collectionModal: CollectionModalReducer.COLLECTION_MODAL_INITIAL_STATE,
  notificationDropdown: NotificationDropdownReducer.NOTIFICATION_DROPDOWN_INITIAL_STATE,
};

export const rootReducer = Redux.combineReducers({
  app: AppReducer.reducer,
  postShow: PostShowReducer.reducer,
  editor: EditorReducer.reducer,
  sidebar: SidebarReducer.reducer,
  loginModal: LoginModalReducer.reducer,
  comments: CommentsReducer.reducer,
  collectionModal: CollectionModalReducer.reducer,
  notificationDropdown: NotificationDropdownReducer.reducer,
  routing: routerReducer,
});
