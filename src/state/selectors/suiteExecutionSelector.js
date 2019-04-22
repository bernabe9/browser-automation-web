import { suiteExecutions as suiteExecutionSchema } from 'state/schemas/suiteExecution'
import Selector from './selector'

export default class SuiteExecutionSelector extends Selector {
  objName = 'suiteExecutions'

  schema = suiteExecutionSchema
}
