module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        includeConsoleOutput: true,
        outputName: 'output.xml',
      },
    ],
  ],
}
