import shortid    from 'shortid'
import isEqual    from 'lodash.isequal'
import cloneDeep  from 'lodash.clonedeep'

import ActionType from '../constant/ActionType'
import FileFormat from '../constant/FileFormat'
import nodesMeta from '../meta/nodes'

const initial = {
  trainPercent : 70
}

const Defaults = (state = initial, action) => {
  switch(action.type){
    case ActionType.Defaults.UPDATE: {
      const updates = action.payload
      return {...state, ...updates}
    }
    
    case ActionType.Defaults.RESTORE: {
      return initial
    }
  }
  return state
}

export default Defaults
