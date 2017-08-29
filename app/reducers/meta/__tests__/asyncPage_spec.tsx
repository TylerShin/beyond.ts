jest.unmock("../asyncPage");

import { AsyncPageFactory } from "../asyncPage";

describe("asnycPage reducer", () => {
  describe("AsyncPageFactory function", () => {
    describe("when there is no argument", () => {
      it("should return recordified ASYNC_PAGE_INITIAL_STATE", () => {
        expect(AsyncPageFactory().toString()).toContain("Record");
      });
    });
  });
});
