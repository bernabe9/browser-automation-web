import { stressExecutions as stressExecutionSchema } from 'state/schemas/stressExecution'
import Selector from './selector'

export default class StressExecutionSelector extends Selector {
  objName = 'stressExecutions'

  schema = stressExecutionSchema
}
