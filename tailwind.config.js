// tailwind.config.js
import forms from "@tailwindcss/forms";
import preline from "preline/plugin";
/** @type {import('tailwindcss').Config} */
export const content = [
  // "./node_modules/preline/dist/*.js",
  "./node_modules/preline/preline.js",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const plugins = [
  // require("@tailwindcss/forms"), require("preline/plugin")
  //  [preline],
  preline,
  forms,
];

export const theme = {
  extend: {
    display: ["group-hover"], // perhaps exclude this one temporarily?
  },
};
// export const theme = {
//   screens: {
//     sm: "480px",
//     md: "768px",
//     lg: "976px",
//     xl: "1440px",
//   },
//   colors: {
//     blue: "#1fb6ff",
//     purple: "#7e5bef",
//     pink: "#ff49db",
//     orange: "#ff7849",
//     green: "#13ce66",
//     yellow: "#ffc82c",
//     "gray-dark": "#273444",
//     gray: "#8492a6",
//     "gray-light": "#d3dce6",
//   },
//   fontFamily: {
//     sans: ["Graphik", "sans-serif"],
//     serif: ["Merriweather", "serif"],
//   },
//   extend: {
//     spacing: {
//       128: "32rem",
//       144: "36rem",
//     },
//     borderRadius: {
//       "4xl": "2rem",
//     },
//   },
// };

// /** @type {import('tailwindcss').Config} */
// // export const content = ["./dist/*.html"];
// export const content = [
//   // "./node_modules/preline/preline.js",
//   // "node_modules/preline/dist/*.js",
//   "./src/**/*.{js,jsx,ts,tsx}",
// ];
// export const theme = {
//   // content: ["./node_modules/preline/preline.js"],
//   content: ["node_modules/preline/dist/*.js"],
//   plugins: [
//     // require("@tailwindcss/forms"),
//     require("preline/plugin"),
//   ],
//   theme: {
//     screens: {
//       sm: "480px",
//       md: "768px",
//       lg: "976px",
//       xl: "1440px",
//     },
//     colors: {
//       blue: "#1fb6ff",
//       purple: "#7e5bef",
//       pink: "#ff49db",
//       orange: "#ff7849",
//       green: "#13ce66",
//       yellow: "#ffc82c",
//       "gray-dark": "#273444",
//       gray: "#8492a6",
//       "gray-light": "#d3dce6",
//     },
//     fontFamily: {
//       sans: ["Graphik", "sans-serif"],
//       serif: ["Merriweather", "serif"],
//     },
//     extend: {
//       spacing: {
//         128: "32rem",
//         144: "36rem",
//       },
//       borderRadius: {
//         "4xl": "2rem",
//       },
//     },
//   },
// };
// export const plugins = [];
