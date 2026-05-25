module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};