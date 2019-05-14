import { suiteExecutions as suiteExecutionSchema } from 'state/schemas/suiteExecution'
import Selector from './selector'

export default class SuiteExecutionSelector extends Selector {
  objName = 'suiteExecutions'

  schema = suiteExecutionSchema

  findOrdered = (state, fn) => {
    const suite = this.find(state, fn)
    if (suite) {
      suite.executions.sort((a, b) => {
        if (a.status === b.status) {
          return 0
        }
        if (
          a.status === 'error' ||
          b.status === 'pending' ||
          (a.status === 'running' && b.status !== 'error')
        ) {
          return -1
        }
        return 1
      })
    }
    return suite
  }
}
