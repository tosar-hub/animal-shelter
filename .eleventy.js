module.exports = function(eleventyConfig) {
  // Копируем папку css в результат (если понадобится свой CSS)
  eleventyConfig.addPassthroughCopy("css");
  
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    // Если деплоите на GitHub Pages в поддиректорию /animal-shelter/,
    // раскомментируйте строку ниже и замените на имя репозитория
    // pathPrefix: "/animal-shelter/"
  };
};