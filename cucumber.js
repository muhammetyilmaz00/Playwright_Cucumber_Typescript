const common = {
  requireModule: ["ts-node/register"],
  require: ["src/test/steps/**/*.ts", "src/test/steps/web/hooks.ts"],
  dryRun: false,
  tags: process.env.TAGS || "@regression"
};

module.exports = {
  default: {
    ...common,
    paths: ["src/test/featureFiles/**/*.feature"],
    parallel:2,
    format: [
      "progress-bar",
      "allure-cucumberjs/reporter"
    ],
  },
  rerun: {
    ...common,
    format: [
      "progress-bar",
      "allure-cucumberjs/reporter",
      "rerun:@rerun.txt",
    ],
  },
  ci: {
    ...common,
    paths: ["src/test/featureFiles/**/*.feature"],
    parallel:2,
    format: [
      "allure-cucumberjs/reporter"
    ],
    retry: 1,
  },
};
