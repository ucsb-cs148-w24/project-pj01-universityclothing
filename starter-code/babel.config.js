module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['next/babel'],
    //presets: ['babel-preset-expo'],
  };
};
