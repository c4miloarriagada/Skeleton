exports.config = {
  allScriptsTimeout: 11000,
  specs: ["./e2e/**/*.e2e-spec.ts"],
  capabilities: {
    browserName: "chrome",
  },
  directConnect: true,
  baseUrl: "http://localhost:8100/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },
  onPrepare() {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.e2e.json"),
    });
    const JasmineSpecReporter = require("jasmine-spec-reporter").SpecReporter;
    jasmine
      .getEnv()
      .addReporter(
        new JasmineSpecReporter({ spec: { displayStacktrace: true } })
      );
  },
};
