// // eslint-disable-next-line no-undef
// module.exports = {
//   // configure the paths to all of your source files
//   content: [
//     "node_modules/preline/dist/*.js",
//     "./node_modules/preline/preline.js",
//     "./src/**/*.{html,js}",
//   ],

//   // enable dark mode via class strategy
//   darkMode: "class",

//   theme: {
//     extend: {
//       // extend base Tailwind CSS utility classes
//     },
//   },

//   // add plugins to your Tailwind CSS project
//   plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
// };

/** @type {import('tailwindcss').Config} */
// export const content = ["./dist/*.html"];
export const content = [
  // "./node_modules/preline/preline.js",
  // "node_modules/preline/dist/*.js",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  // content: ["./node_modules/preline/preline.js"],
  plugins: [
    require("@tailwindcss/forms"),
    // require("preline/plugin"),
    // require("preline/plugin"), require("@tailwindcss/forms")
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
export const plugins = [];
