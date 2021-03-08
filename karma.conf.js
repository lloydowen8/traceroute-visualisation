// Karma configuration
// Generated on Sun Nov 15 2020 21:01:24 GMT+0000 (Greenwich Mean Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-sourcemap-loader',
  ],

    // list of files / patterns to load in the browser
    files: [
      'test-dist/main.js',
      'test-dist/src.js',
      'test-dist/runtime.js',
      'test-dist/vendors.js',
      {pattern: 'test-dist/**', included: false, watched: false, served: true},
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test-dist/src.js': ['sourcemap', 'coverage'],
   },

   proxies:{
    '/context.html/' : '/base/test-dist/',
   },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: { 
      reporters: [
        {type: 'html', dir : 'coverage/', includeAllSources: true},
        {type: 'text-summary'}
      ] 
    },

    browsers: ['ChromiumHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox']
      }
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
