const routes = {
  index: '/',
  dashboard: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef'
  } = {}) => `/${repositoryOwner}/${repositoryName}/${repositoryRef}/dashboard`,
  createTestSuite: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef'
  } = {}) => `/${repositoryOwner}/${repositoryName}/${repositoryRef}/new-suite`,
  test: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef'
  } = {}) => `/${repositoryOwner}/${repositoryName}/${repositoryRef}/tests`,
  suite: (id = ':id') => `/test-suites/${id}`,
  suiteExecution: (id = ':id') => `/suite-execution/${id}`,
  login: '/login'
}

export default routes
