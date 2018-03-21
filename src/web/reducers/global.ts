import * as types from '../consts/Actions'
export function reduce(state = {}, action){
  switch (action.type) {
    case types.CREATE_PRODUCT : return {
      ... state,
      products : (state as any).products.concat(action.payload)
    }
    default : return {
       ... state,
       ... action.payload
     };
  }
}
