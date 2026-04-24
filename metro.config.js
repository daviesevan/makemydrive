const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Allow Metro to bundle Rive animation files
config.resolver.assetExts.push("riv");

module.exports = withNativewind(config);
