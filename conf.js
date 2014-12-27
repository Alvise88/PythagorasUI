// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'firefox' // or 'safari'
    },
    specs: ['test/spec.js']
}