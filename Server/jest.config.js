module.exports = {
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
    reporters: [
        "default",
        ["jest-html-reporters", {
            pageTitle: "Unit Test",
            outputPath: "test-report.html"
        }]
    ],
    collectCoverage: true,
    collectCoverageFrom: ["**/services/**.{js,jsx}"],
    coverageReporters: ["json", "lcov", "text", "clover"],
};