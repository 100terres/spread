import { describe, it } from "@std/testing/bdd";
import { assertSpyCalls, spy } from "@std/testing/mock";
import { expect } from "@std/expect";

import spread from "./spread.ts";

describe("spread()", () => {
  describe("if()", () => {
    // Using thruty examples from https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    describe("given a truthy condition", () => {
      describe("given an array", () => {
        it("returns the array", () => {
          const array = [1, 2, 3];

          expect(spread(array).if(true)).toBe(array);
          expect(spread(array).if({})).toBe(array);
          expect(spread(array).if([])).toBe(array);
          expect(spread(array).if(42)).toBe(array);
          expect(spread(array).if("0")).toBe(array);
          expect(spread(array).if("false")).toBe(array);
          expect(spread(array).if(-42)).toBe(array);
          expect(spread(array).if(12n)).toBe(array);
          expect(spread(array).if(3.14)).toBe(array);
          expect(spread(array).if(-3.14)).toBe(array);
          expect(spread(array).if(Infinity)).toBe(array);
          expect(spread(array).if(-Infinity)).toBe(array);
        });
      });

      describe("given an object", () => {
        it("returns the object", () => {
          const object = { a: "b" };

          expect(spread(object).if(true)).toBe(object);
          expect(spread(object).if({})).toBe(object);
          expect(spread(object).if([])).toBe(object);
          expect(spread(object).if(42)).toBe(object);
          expect(spread(object).if("0")).toBe(object);
          expect(spread(object).if("false")).toBe(object);
          expect(spread(object).if(-42)).toBe(object);
          expect(spread(object).if(12n)).toBe(object);
          expect(spread(object).if(3.14)).toBe(object);
          expect(spread(object).if(-3.14)).toBe(object);
          expect(spread(object).if(Infinity)).toBe(object);
          expect(spread(object).if(-Infinity)).toBe(object);
        });
      });

      describe("given a callback", () => {
        it("invokes the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = spy(() => array);

          spread(() => mockFnConstructor()).if(true);
          spread(() => mockFnConstructor()).if({});
          spread(() => mockFnConstructor()).if([]);
          spread(() => mockFnConstructor()).if(42);
          spread(() => mockFnConstructor()).if("0");
          spread(() => mockFnConstructor()).if("false");
          spread(() => mockFnConstructor()).if(-42);
          spread(() => mockFnConstructor()).if(12n);
          spread(() => mockFnConstructor()).if(3.14);
          spread(() => mockFnConstructor()).if(-3.14);
          spread(() => mockFnConstructor()).if(Infinity);
          spread(() => mockFnConstructor()).if(-Infinity);

          assertSpyCalls(mockFnConstructor, 12);
        });

        describe("given a callback returning an array", () => {
          it("returns the array returned by the callback", () => {
            const array = [1, 2, 3];

            expect(spread(() => array).if(true)).toBe(array);
            expect(spread(() => array).if({})).toBe(array);
            expect(spread(() => array).if([])).toBe(array);
            expect(spread(() => array).if(42)).toBe(array);
            expect(spread(() => array).if("0")).toBe(array);
            expect(spread(() => array).if("false")).toBe(array);
            expect(spread(() => array).if(-42)).toBe(array);
            expect(spread(() => array).if(12n)).toBe(array);
            expect(spread(() => array).if(3.14)).toBe(array);
            expect(spread(() => array).if(-3.14)).toBe(array);
            expect(spread(() => array).if(Infinity)).toBe(array);
            expect(spread(() => array).if(-Infinity)).toBe(array);
          });
        });

        describe("given a callback returning an object", () => {
          it("returns the object returned by the callback", () => {
            const object = { a: "b" };

            expect(spread(() => object).if(true)).toBe(object);
            expect(spread(() => object).if({})).toBe(object);
            expect(spread(() => object).if([])).toBe(object);
            expect(spread(() => object).if(42)).toBe(object);
            expect(spread(() => object).if("0")).toBe(object);
            expect(spread(() => object).if("false")).toBe(object);
            expect(spread(() => object).if(-42)).toBe(object);
            expect(spread(() => object).if(12n)).toBe(object);
            expect(spread(() => object).if(3.14)).toBe(object);
            expect(spread(() => object).if(-3.14)).toBe(object);
            expect(spread(() => object).if(Infinity)).toBe(object);
            expect(spread(() => object).if(-Infinity)).toBe(object);
          });
        });
      });
    });

    // Using falsy examples from https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    describe("given a falsy condition", () => {
      it("returns an empty array", () => {
        const array = [1, 2, 3];

        expect(spread(array).if(false)).toEqual([]);
        expect(spread(array).if(null)).toEqual([]);
        expect(spread(array).if(undefined)).toEqual([]);
        expect(spread(array).if(0)).toEqual([]);
        expect(spread(array).if(-0)).toEqual([]);
        expect(spread(array).if(0n)).toEqual([]);
        expect(spread(array).if(NaN)).toEqual([]);
        expect(spread(array).if("")).toEqual([]);
      });

      describe("given a callback", () => {
        it("does not invoke the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = spy(() => array);

          spread(() => mockFnConstructor()).if(false);
          spread(() => mockFnConstructor()).if(null);
          spread(() => mockFnConstructor()).if(undefined);
          spread(() => mockFnConstructor()).if(0);
          spread(() => mockFnConstructor()).if(-0);
          spread(() => mockFnConstructor()).if(0n);
          spread(() => mockFnConstructor()).if(NaN);
          spread(() => mockFnConstructor()).if("");

          assertSpyCalls(mockFnConstructor, 0);
        });

        it("returns an empty array", () => {
          const array = [1, 2, 3];

          expect(spread(() => array).if(false)).toEqual([]);
          expect(spread(() => array).if(null)).toEqual([]);
          expect(spread(() => array).if(undefined)).toEqual([]);
          expect(spread(() => array).if(0)).toEqual([]);
          expect(spread(() => array).if(-0)).toEqual([]);
          expect(spread(() => array).if(0n)).toEqual([]);
          expect(spread(() => array).if(NaN)).toEqual([]);
          expect(spread(() => array).if("")).toEqual([]);
        });
      });
    });
  });

  describe("unless()", () => {
    // Using thruty examples from https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    describe("given a truthy condition", () => {
      it("returns an empty array", () => {
        const array = [1, 2, 3];

        expect(spread(array).unless(true)).toEqual([]);
        expect(spread(array).unless({})).toEqual([]);
        expect(spread(array).unless([])).toEqual([]);
        expect(spread(array).unless(42)).toEqual([]);
        expect(spread(array).unless("0")).toEqual([]);
        expect(spread(array).unless("false")).toEqual([]);
        expect(spread(array).unless(-42)).toEqual([]);
        expect(spread(array).unless(12n)).toEqual([]);
        expect(spread(array).unless(3.14)).toEqual([]);
        expect(spread(array).unless(-3.14)).toEqual([]);
        expect(spread(array).unless(Infinity)).toEqual([]);
        expect(spread(array).unless(-Infinity)).toEqual([]);
      });

      describe("given a callback", () => {
        it("does not invoke the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = spy(() => array);

          spread(() => mockFnConstructor()).unless(true);
          spread(() => mockFnConstructor()).unless({});
          spread(() => mockFnConstructor()).unless([]);
          spread(() => mockFnConstructor()).unless(42);
          spread(() => mockFnConstructor()).unless("0");
          spread(() => mockFnConstructor()).unless("false");
          spread(() => mockFnConstructor()).unless(-42);
          spread(() => mockFnConstructor()).unless(12n);
          spread(() => mockFnConstructor()).unless(3.14);
          spread(() => mockFnConstructor()).unless(-3.14);
          spread(() => mockFnConstructor()).unless(Infinity);
          spread(() => mockFnConstructor()).unless(-Infinity);

          assertSpyCalls(mockFnConstructor, 0);
        });

        it("returns an empty array", () => {
          const array = [1, 2, 3];

          expect(spread(() => array).unless(true)).toEqual([]);
          expect(spread(() => array).unless({})).toEqual([]);
          expect(spread(() => array).unless([])).toEqual([]);
          expect(spread(() => array).unless(42)).toEqual([]);
          expect(spread(() => array).unless("0")).toEqual([]);
          expect(spread(() => array).unless("false")).toEqual([]);
          expect(spread(() => array).unless(-42)).toEqual([]);
          expect(spread(() => array).unless(12n)).toEqual([]);
          expect(spread(() => array).unless(3.14)).toEqual([]);
          expect(spread(() => array).unless(-3.14)).toEqual([]);
          expect(spread(() => array).unless(Infinity)).toEqual([]);
          expect(spread(() => array).unless(-Infinity)).toEqual([]);
        });
      });
    });

    // Using falsy examples from https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    describe("given a falsy condition", () => {
      describe("given an array", () => {
        it("returns the array", () => {
          const array = [1, 2, 3];

          expect(spread(array).unless(false)).toBe(array);
          expect(spread(array).unless(null)).toBe(array);
          expect(spread(array).unless(undefined)).toBe(array);
          expect(spread(array).unless(0)).toBe(array);
          expect(spread(array).unless(-0)).toBe(array);
          expect(spread(array).unless(0n)).toBe(array);
          expect(spread(array).unless(NaN)).toBe(array);
          expect(spread(array).unless("")).toBe(array);
        });
      });

      describe("given an object", () => {
        it("returns the object", () => {
          const object = { a: "b" };

          expect(spread(object).unless(false)).toBe(object);
          expect(spread(object).unless(null)).toBe(object);
          expect(spread(object).unless(undefined)).toBe(object);
          expect(spread(object).unless(0)).toBe(object);
          expect(spread(object).unless(-0)).toBe(object);
          expect(spread(object).unless(0n)).toBe(object);
          expect(spread(object).unless(NaN)).toBe(object);
          expect(spread(object).unless("")).toBe(object);
        });
      });

      describe("given a callback", () => {
        it("invokes the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = spy(() => array);

          spread(() => mockFnConstructor()).unless(false);
          spread(() => mockFnConstructor()).unless(null);
          spread(() => mockFnConstructor()).unless(undefined);
          spread(() => mockFnConstructor()).unless(0);
          spread(() => mockFnConstructor()).unless(-0);
          spread(() => mockFnConstructor()).unless(0n);
          spread(() => mockFnConstructor()).unless(NaN);
          spread(() => mockFnConstructor()).unless("");

          assertSpyCalls(mockFnConstructor, 8);
        });

        describe("given a callback returning an array", () => {
          it("returns the array returned by the callback", () => {
            const array = [1, 2, 3];

            expect(spread(() => array).unless(false)).toEqual(array);
            expect(spread(() => array).unless(null)).toEqual(array);
            expect(spread(() => array).unless(undefined)).toEqual(array);
            expect(spread(() => array).unless(0)).toEqual(array);
            expect(spread(() => array).unless(-0)).toEqual(array);
            expect(spread(() => array).unless(0n)).toEqual(array);
            expect(spread(() => array).unless(NaN)).toEqual(array);
            expect(spread(() => array).unless("")).toEqual(array);
          });
        });

        describe("given a callback returning an object", () => {
          it("returns the object returned by the callback", () => {
            const object = { a: "b" };

            expect(spread(() => object).unless(false)).toEqual(object);
            expect(spread(() => object).unless(null)).toEqual(object);
            expect(spread(() => object).unless(undefined)).toEqual(object);
            expect(spread(() => object).unless(0)).toEqual(object);
            expect(spread(() => object).unless(-0)).toEqual(object);
            expect(spread(() => object).unless(0n)).toEqual(object);
            expect(spread(() => object).unless(NaN)).toEqual(object);
            expect(spread(() => object).unless("")).toEqual(object);
          });
        });
      });
    });
  });
});
