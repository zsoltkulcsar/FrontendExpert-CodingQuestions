function test() {
  function describe(testSuiteName, func) {
    console.log(`beginning test suite ${testSuiteName}`);

    try {
      func();
      console.log(`successfully completed test suite ${testSuiteName}`);
    } catch (error) {
      const { testCaseName, errorMessage } = error;

      console.error(
        `failed running test suite ${testSuiteName} on ` +
          `test case ${testCaseName} with error message ${errorMessage}`
      );
    }
  }

  function it(testCaseName, func) {
    console.log(`beginning test case ${testCaseName}`);

    try {
      func();
      console.log(`successfully completed test case ${testCaseName}`);
    } catch (errorMessage) {
      throw { testCaseName, errorMessage };
    }
  }

  function expect(actual) {
    return new ExpectFunctions(actual);
  }

  class ExpectFunctions {
    constructor(actual) {
      this.actual = actual;
      this.stringifiedActual = JSON.stringify(actual);
    }

    toExist() {
      if (this.actual == null) {
        throw `expected value to exist but got ${this.stringifiedActual}`;
      }
    }

    toBe(expected) {
      if (this.actual !== expected) {
        throw `expected ${this.stringifiedActual} to be ${JSON.stringify(
          expected
        )}`;
      }
    }

    toBeType(type) {
      if (typeof this.actual !== type) {
        throw `expected ${
          this.stringifiedActual
        } to be of type ${type} but got ${typeof this.actual}`;
      }
    }
  }

  function sum(a, b) {
    return a + b;
  }

  describe("sum function", () => {
    it("should correctly add two positive numbers", () => {
      const result = sum(2, 3);
      expect(result).toBe(5);
    });

    it("should correctly add negative numbers", () => {
      const result = sum(-2, -3);
      expect(result).toBe(-5);
    });

    it("should handle adding a negative and a positive number", () => {
      const result = sum(-2, 3);
      expect(result).toBe(1);
    });

    it("should return zero when adding zero and zero", () => {
      const result = sum(0, 0);
      expect(result).toBe(0);
    });

    it("should return the same number when adding zero", () => {
      const result1 = sum(5, 0);
      const result2 = sum(0, 5);
      expect(result1).toBe(5);
      expect(result2).toBe(5);
    });
  });
}

module.exports = test;
