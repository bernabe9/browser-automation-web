import { executions as executionSchema } from 'state/schemas/execution'
import Selector from './selector'

export default class ExecutionSelector extends Selector {
  objName = 'executions'

  schema = executionSchema
}
