// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'firefox' // or 'safari'
    },
    baseUrl: 'http://localhost:63342',
    specs: ['test/js/agoraDatatableTest.js']
}