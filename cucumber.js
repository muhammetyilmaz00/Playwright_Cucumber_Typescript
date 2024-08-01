module.exports = {
  default: {
    paths: ["src/test/features/**/*.feature"],
    dryRun: false,
    require: ["src/test/steps/**/*.ts", "src/test/steps/web/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
  },
  rerun: {
    dryRun: false,
    require: ["src/test/steps/**/*.ts", "src/test/steps/web/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
  },
};
