const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/alpine.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // function getProducts(api, config) {
  //   const { type, tags } = config;
  //   const all = api.getAll();
  //   const allOfType = all.filter(item => item.data.type && item.data.type.includes(type));
  //   if (type && !tags) {
  //     return allOfType;
  //   } else if (type && tags && tags.length) {
  //     api.getFilteredByTags.call(api, ...tags).filter(item => item.data.type && item.data.type.includes(type));
  //   }
  // }

  function getProducts(config) {
    const { type, tags } = config;
    return api => {
      const all = api.getAll();
      if (type && !tags) {
        return all.filter(item => item.data.type && item.data.type.includes(type))
      } else if (type && tags) {
        return api.getFilteredByTags(...tags);
      }
    }
  }

  eleventyConfig.addCollection('productionChemicals', getProducts({
    type: 'Production Chemicals'
  }));

  eleventyConfig.addCollection('waterTreatment', getProducts({
    type: 'Water Treatment'
  }));

  eleventyConfig.addCollection('drillingChemicals', getProducts({
    type: 'Drilling Chemicals'
  }));

  eleventyConfig.addCollection('fracturingChemicals', getProducts({
    type: 'Fracturing Chemicals'
  }));


  eleventyConfig.addCollection('midStreamChemicals', getProducts({
    type: 'Mid-stream Chemicals'
  }));

  eleventyConfig.addCollection('productionCorrosionInhibitorConcentrates', getProducts({
    type: 'Production Chemicals',
    tags: ['Corrosion Inhibitors', 'Concentrates']
  }));

  eleventyConfig.addCollection('productionCorrosionInhibitorIntermediates', getProducts({
    type: 'Production Chemicals',
    tags: ['Corrosion Inhibitors', 'Intermediates']
  }));

  eleventyConfig.addCollection('productionCorrosionInhibitorFinishedProducts', getProducts({
    type: 'Production Chemicals',
    tags: ['Corrosion Inhibitors', 'Finished Products']
  }));

  eleventyConfig.addCollection('productionScaleInhibitorConcentrates', getProducts({
    type: 'Production Chemicals',
    tags: ['Scale Inhibitors', 'Concentrates']
  }));

  eleventyConfig.addCollection('productionScaleInhibitorIntermediates', getProducts({
    type: 'Production Chemicals',
    tags: ['Scale Inhibitors', 'Intermediates']
  }));

  eleventyConfig.addCollection('productionDemulsifierConcentrates', getProducts({
    type: 'Production Chemicals',
    tags: ['Demulsifiers/Paraffin Products', 'Concentrates']
  }));

  eleventyConfig.addCollection('waterTreatmentAdbac', getProducts({
    type: 'Water Treatment',
    tags: ['ADBACs and Coco Quats']
  }));

  eleventyConfig.addCollection('waterTreatmentClarifiers', getProducts({
    type: 'Water Treatment',
    tags: ['Water Treatment/Clarifiers']
  }));

  eleventyConfig.addCollection('waterTreatmentSurfactants', getProducts({
    type: 'Water Treatment',
    tags: ['Surfactants']
  }));

  eleventyConfig.addCollection('drilling', getProducts({
    type: 'Drilling Chemicals'
  }));

  eleventyConfig.addCollection('fracturing', getProducts({
    type: 'Fracturing Chemicals'
  }));

  eleventyConfig.addCollection('midStream', getProducts({
    type: 'Mid-stream Chemicals'
  }));

  // eleventyConfig.addCollection('fracturing', getProducts({
  //   type: 'Fracturing Chemicals'
  // }));
  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
