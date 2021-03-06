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
  editTestSuite: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef',
    id = ':id'
  } = {}) =>
    `/${repositoryOwner}/${repositoryName}/${repositoryRef}/edit-suite/${id}`,
  test: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef'
  } = {}) => `/${repositoryOwner}/${repositoryName}/${repositoryRef}/tests`,
  suite: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef',
    id = ':id'
  } = {}) =>
    `/${repositoryOwner}/${repositoryName}/${repositoryRef}/suites/${id}`,
  suiteExecution: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef',
    id = ':id'
  } = {}) =>
    `/${repositoryOwner}/${repositoryName}/${repositoryRef}/suite-execution/${id}`,
  editRepository: ({
    repositoryOwner = ':repositoryOwner',
    repositoryName = ':repositoryName',
    repositoryRef = ':repositoryRef'
  } = {}) =>
    `/${repositoryOwner}/${repositoryName}/${repositoryRef}/edit-repository`,
  createRepository: '/new-repository',
  login: '/login'
}

export default routes
