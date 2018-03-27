import * as types from '../consts/Actions'

function listRemove(list :any[], prop:string, val:string){
  return list.filter(e => e[prop] !== val).slice();
}

export function reduce(state = {}, action){
  switch (action.type) {
    case types.CREATE_PRODUCT : return {
      ... state,
      products : (state as any).products.concat(action.payload)
    }
    case types.UPDATE_PRODUCT : return {
      ... state,
      products : listRemove((state as any).products,'name',action.payload.name).concat(action.payload)
    }
    case types.REMOVE_PRODUCT : return {
      ... state,
      products : listRemove((state as any).products,'name',action.payload.name)
    }
    default : return {
       ... state,
       ... action.payload
    };
  }
}
