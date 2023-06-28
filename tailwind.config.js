/** @type {import('tailwindcss').Config} */ module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      ms: "325px",
      mm: "375px",
      ml: "425px",
      ss: "640px",
      tab: "768px",
      lap: "1024px",
      mon: "1280px",
    },
    extend: {
      backgroundImage: {
        birds: "url(../src/Assets/syncbirdsbg.jpeg)",
      },
      fontFamily: {
        albraMed: ["albraMed"],
        albraReg: ["albraReg"],
        albraLight: ["albraLight"],
      },
    },
  },
  plugins: [],
};
