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
  suite: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    id = ':id'
  } = {}) => `/${repositoryOwner}/${repositoryName}/suites/${id}`,
  suiteExecution: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef',
    id = ':id'
  } = {}) =>
    `/${repositoryOwner}/${repositoryName}/${repositoryRef}/suite-execution/${id}`,
  login: '/login'
}

export default routes
