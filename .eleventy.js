<<<<<<< HEAD
module.exports = function (eleventyConfig) {
  // Копируем папку css (если нужны свои стили)
  eleventyConfig.addPassthroughCopy("css");

=======
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
>>>>>>> cfe3eab256dee137f638a7e07ee239e9100c412d
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
<<<<<<< HEAD
    // Если вы деплоите на GitHub Pages в поддиректорию (например, /animal-shelter/),
    // раскомментируйте строку ниже и укажите имя репозитория:
    pathPrefix: "/animal-shelter/"
=======
>>>>>>> cfe3eab256dee137f638a7e07ee239e9100c412d
  };
};