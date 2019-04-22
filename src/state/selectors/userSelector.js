import { denormalize } from 'normalizr'

import { user as userSchema } from 'state/schemas/user'
import Selector from './selector'

export default class ExecutionSelector extends Selector {
  objName = 'user'

  schema = userSchema

  getAll = state => {
    if (!state[this.topLevelObj]) {
      return undefined
    }

    if (!state[this.topLevelObj][this.objName]) {
      return undefined
    }

    const result = denormalize(
      Object.keys(state[this.topLevelObj][this.objName])[0],
      this.schema,
      state.data
    )

    return result
  }
}
