module.exports = function (eleventyConfig) {
  // Копируем папку css (если нужны свои стили)
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
    // Если вы деплоите на GitHub Pages в поддиректорию (например, /animal-shelter/),
    // раскомментируйте строку ниже и укажите имя репозитория:
    pathPrefix: "/animal-shelter/"
  };
};