const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

const aliases = {
  screens: path.resolve("./src/screens"),
  assets: path.resolve("./src/assets"),
  utils: path.resolve("./src/utils"),
  components: path.resolve("./src/components"),
  engines: path.resolve("./src/engines"),
};

const webViewRule = {
  test: /postMock.html$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

const babelLoaderRules = {
  test: /\.tsx?$/,
  loader: "babel-loader",
  options: {
    presets: ["babel-preset-expo"],
  },
};

const fontLoaderRules = {
  test: /\.ttf$/,
  loader: "url-loader", // or directly file-loader
  include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
};

module.exports = async function (env, argv) {
  //   const config = await createExpoWebpackConfigAsync(env, argv);

  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          "@ui-kitten/components",
          "moti",
          "dripsy",
          "@dripsy/core",
        ],
      },
    },
    argv
  );

  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases,
    "react-native-webview": "react-native-web-webview",
  };

  config.module.rules = [
    ...config.module.rules,
    fontLoaderRules,
    babelLoaderRules,
    webViewRule,
  ];
  return config;
};
