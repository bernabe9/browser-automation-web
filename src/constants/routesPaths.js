const routes = {
  index: '/',
  createTestSuite: '/new-suite',
  test: '/tests',
  suite: (id = ':id') => `/test-suites/${id}`,
  suiteExecution: (id = ':id') => `/suite-execution/${id}`
}

export default routes
