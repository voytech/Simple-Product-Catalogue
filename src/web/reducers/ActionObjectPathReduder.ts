export class ActionObjectPathReduder{
  static reduce(state = {}, action){
    return {
       ... state,
       ... action.payload
     };
  }
}
