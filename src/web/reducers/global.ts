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
    case types.CREATE_PRICELIST : return {
      ... state,
      pricelists : (state as any).pricelists.concat(action.payload)
    }
    case types.UPDATE_PRICELIST : return {
      ... state,
      pricelists : listRemove((state as any).pricelists,'name',action.payload.name).concat(action.payload)
    }
    case types.REMOVE_PRICELIST : return {
      ... state,
      pricelists : listRemove((state as any).pricelists,'name',action.payload.name)
    }
    case types.LOAD_ENTITY_KEYS : return {
      ... state,
      dictionary : { ...state['dictionary'],  ... action.payload  }
    }
    default : return {
       ... state,
       ... action.payload
    };
  }
}
