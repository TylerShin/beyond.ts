import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

export interface IAsyncPage {
  isLoading: boolean;
  isFailed: boolean;
}

export interface IAsyncPageRecord extends TypedRecord<IAsyncPageRecord>, IAsyncPage {}

const defaultAsyncPageState = {
  isLoading: false,
  isFailed: false,
};

export const AsyncPageFactory = makeTypedFactory<IAsyncPage, IAsyncPageRecord>(defaultAsyncPageState);

export const ASYNC_PAGE_INITIAL_STATE = AsyncPageFactory();
