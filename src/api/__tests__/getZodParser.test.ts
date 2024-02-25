import { z } from "zod";
import { getZodParser } from "../getZodParser";

describe("getZodParser", () => {
  const zodParser = getZodParser(z.object({ name: z.string(), age: z.number() }));

  test("works when invalid data", () => {
    expect(() => zodParser({ name: "ali", age: "2" })).toThrow();
  });

  test("works when valid data", () => {
    expect(zodParser({ name: "ali", age: 2 })).toMatchObject({ name: "ali", age: 2 });
  });
});
