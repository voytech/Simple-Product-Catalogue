import * as types from '../consts/Actions'

function listRemove(list :any[], payload : any, prop:string){
  let element = list.filter(e => e[prop] === payload[prop])[0]
  if (element){
    let index = list.indexOf(element)
    list.splice(index,1)
    return list.slice()
  }
  return list;
}

function listUpdate(list : any[], payload : any, prop:string){
    let element = list.filter(e => e[prop] === payload[prop])[0]
    if (element){
      let index = list.indexOf(element)
      list.splice(index,1,payload)
      return list.slice()
    }
    return list;
}

export function reduce(state = {}, action){
  switch (action.type) {
    case types.CREATE_PRODUCT : return {
      ... state,
      products : (state as any).products.concat(action.payload)
    }
    case types.UPDATE_PRODUCT : return {
      ... state,
      products : listUpdate((state as any).products,action.payload,'name')
    }
    case types.REMOVE_PRODUCT : return {
      ... state,
      products : listRemove((state as any).products,action.payload,'name')
    }
    case types.CREATE_PRICELIST : return {
      ... state,
      pricelists : (state as any).pricelists.concat(action.payload)
    }
    case types.UPDATE_PRICELIST : return {
      ... state,
      pricelists : listUpdate((state as any).pricelists,action.payload,'name')
    }
    case types.REMOVE_PRICELIST : return {
      ... state,
      pricelists : listRemove((state as any).pricelists,action.payload,'name')
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
