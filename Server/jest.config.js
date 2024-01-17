module.exports = {
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
    reporters: [
        "default",
        ["jest-html-reporter", {
            pageTitle: "Unit Test",
            outputPath: "test-report.html"
        }]
    ]
};