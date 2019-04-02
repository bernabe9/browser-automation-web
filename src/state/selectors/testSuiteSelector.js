import { testSuites as testSuiteSchema } from 'state/schemas/testSuite'
import Selector from './selector'

export default class TestSuiteSelector extends Selector {
  objName = 'testSuites'

  schema = testSuiteSchema
}
