import { stringToNumber } from "../stringToNumber";

describe("stringToNumber", () => {
  test("works correctly", () => {
    expect(stringToNumber("")).toBe(undefined);
    expect(stringToNumber("123")).toBe(123);
  });
});
