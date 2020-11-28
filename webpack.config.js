const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

const aliases = {
  screens: path.resolve("./src/screens"),
  assets: path.resolve("./src/assets"),
  utils: path.resolve("./src/utils"),
  components: path.resolve("./src/components"),
  engines: path.resolve("./src/engines"),
};

const babelLoaderRules = {
  test: /\.tsx?$/,
  loader: "babel-loader",
  options: {
    presets: ["babel-preset-expo"],
  },
};

module.exports = async function (env, argv) {
  //   const config = await createExpoWebpackConfigAsync(env, argv);

  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["@ui-kitten/components"],
      },
    },
    argv
  );

  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases,
  };

  config.module.rules = [...config.module.rules, babelLoaderRules];
  return config;
};
