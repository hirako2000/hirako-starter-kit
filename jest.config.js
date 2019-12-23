module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      preset: '@marko/jest',
      testRegex: '/__tests__/[^.]+\\.server\\.js$'
    },
    {
      displayName: 'browser',
      preset: '@marko/jest',
      browser: true,
      testRegex: '/__tests__/[^.]+\\.browser\\.js$'
    }
  ]
};
