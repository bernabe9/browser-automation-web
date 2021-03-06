import { testSuites as testSuiteSchema } from 'state/schemas/testSuite'
import Selector from './selector'

export default class TestSuiteSelector extends Selector {
  objName = 'testSuites'

  schema = testSuiteSchema

  getStatus = suite => {
    const status = Object.values(suite.tests).map(test => test.status)
    if (status.includes('error')) {
      return 'error'
    }
    if (status.includes('running')) {
      return 'running'
    }
    if (status.includes('ready')) {
      return 'ready'
    }
    return 'success'
  }

  getSuite = (state, fn) => {
    const suite = this.find(state, fn)
    if (suite) {
      suite.status = this.getStatus(suite)
    }
    return suite
  }

  getSuitesByRepository = state => {
    const suites = this.getAll(state)
    const { repositoryOwner, repositoryName } = state.environment
    return this.filter(
      suites,
      suite => suite.repository === `${repositoryOwner}/${repositoryName}`
    )
  }
}
