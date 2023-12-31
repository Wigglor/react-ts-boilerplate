// export const roots = ["<rootDir>/src"];
// export const moduleNameMapper = {
//   "\\.(s(a|c)ss)$": "<rootDir>/src/styleMock.ts",
// };
// export const transform = {
//   "^.+\\.tsx?$": "ts-jest",
// };
// export const setupFilesAfterEnv = [
//   // "@testing-library/react/cleanup-after-each",
//   // "@testing-library/jest-dom/extend-expect",
//   "<rootDir>/src/setupTests.ts",
//   // "@testing-library/react",
//   // "@testing-library/jest-dom",
// ];
// export const testRegex = "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$";
// export const moduleFileExtensions = ["ts", "tsx", "js", "jsx", "json", "node"];

module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],

  moduleNameMapper: {
    "\\.(s(a|c)ss)$": "<rootDir>/src/styleMock.ts",
  },
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // "@testing-library/react/cleanup-after-each",
    // "@testing-library/jest-dom/extend-expect",
    "<rootDir>/src/setupTests.ts",
    // "@testing-library/react",
    // "@testing-library/jest-dom",
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
