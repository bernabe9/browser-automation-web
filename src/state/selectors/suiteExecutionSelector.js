import { suiteExecutions as suiteExecutionSchema } from 'state/schemas/suiteExecution'
import status from 'constants/status'
import Selector from './selector'

export default class SuiteExecutionSelector extends Selector {
  objName = 'suiteExecutions'

  schema = suiteExecutionSchema

  findOrdered = (state, fn) => {
    const suite = this.find(state, fn)
    const sortValues = {
      [status.error]: 0,
      [status.running]: 1,
      [status.success]: 2,
      [status.pending]: 3,
      [status.queued]: 4,
      [status.queuedForReTry]: 5
    }
    if (suite) {
      suite.executions.sort((a, b) => {
        return sortValues[a.status] - sortValues[b.status]
      })
    }
    return suite
  }
}
