export function reduce(state = {}, action){
  console.info({
     ... state,
     ... action.payload
  });
  return {
     ... state,
     ... action.payload
   };
}
