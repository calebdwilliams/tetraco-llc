module.exports = {
  purge: {
    mode: "all",
    content: ["./**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
      backgroundImage: theme => ({
        home: "url('/static/img/background-home.jpeg')"
      })
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
