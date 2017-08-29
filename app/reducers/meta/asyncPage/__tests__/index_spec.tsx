jest.unmock("..");

import { reducer } from "..";
import { ACTION_TYPES } from "../../../../actions/actionList";
import { IAsyncPageRecord, ASYNC_PAGE_INITIAL_STATE } from "../records";

describe("asyncPage reducer", () => {
  let mockAction: any;
  let mockState: IAsyncPageRecord;
  let state: IAsyncPageRecord;

  describe("when receive START_TO_FETCHING_GITHUB_ACCOUNT action", () => {
    it("should set isLoading state to true", () => {
      mockAction = {
        type: ACTION_TYPES.START_TO_FETCHING_GITHUB_ACCOUNT,
      };

      state = reducer(ASYNC_PAGE_INITIAL_STATE, mockAction);

      expect(state.isLoading).toBeTruthy();
    });
  });

  describe("when receive SUCCEED_TO_FETCHING_GITHUB_ACCOUNT action", () => {
    beforeEach(() => {
      mockState = ASYNC_PAGE_INITIAL_STATE.set("isLoading", true).set("isFailed", true);

      mockAction = {
        type: ACTION_TYPES.SUCCEED_TO_FETCHING_GITHUB_ACCOUNT,
      };

      state = reducer(mockState, mockAction);
    });

    it("should set isLoading state to false", () => {
      expect(state.isLoading).toBeFalsy();
    });

    it("should set isFailed state to false", () => {
      expect(state.isFailed).toBeFalsy();
    });
  });

  describe("when receive FAIL_TO_FETCHING_GITHUB_ACCOUNT action", () => {
    beforeEach(() => {
      mockState = ASYNC_PAGE_INITIAL_STATE.set("isLoading", true);

      mockAction = {
        type: ACTION_TYPES.FAIL_TO_FETCHING_GITHUB_ACCOUNT,
      };

      state = reducer(mockState, mockAction);
    });

    it("should set isLoading state to false", () => {
      expect(state.isLoading).toBeFalsy();
    });

    it("should set isFailed state to true", () => {
      expect(state.isFailed).toBeTruthy();
    });
  });
});
