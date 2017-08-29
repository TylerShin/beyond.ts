jest.unmock("../records");

import { IAsyncPage, AsyncPageFactory, ASYNC_PAGE_INITIAL_STATE } from "../records";

describe("asyncPage reducer", () => {
  describe("AsyncPageFactory function", () => {
    describe("when there is no argument", () => {
      it("should return recordified state", () => {
        expect(AsyncPageFactory().toString()).toContain("Record");
      });

      it("should be same with ASYNC_PAGE_INITIAL_STATE", () => {
        expect(AsyncPageFactory()).toEqual(ASYNC_PAGE_INITIAL_STATE);
      });
    });

    describe("when there is argument to be recorified", () => {
      let mockState: IAsyncPage;
      beforeEach(() => {
        mockState = {
          isLoading: true,
          isFailed: true,
        };
      });

      it("should return recordified state", () => {
        expect(AsyncPageFactory(mockState).toString()).toContain("Record");
      });

      it("should return mockState's isLoading value", () => {
        expect(AsyncPageFactory(mockState).isLoading).toBeTruthy();
      });

      it("should return recordified isFailed value", () => {
        expect(AsyncPageFactory(mockState).isFailed).toBeTruthy();
      });
    });
  });
});
