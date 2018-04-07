export interface ComposableFunction<T> {
  (input : T) : T;
}

export function compose<T>(...transforms : ComposableFunction<T>[]){
  return (input : T) : T => {
    return transforms.reduce((result,func) => func(result),input);
  }
}
