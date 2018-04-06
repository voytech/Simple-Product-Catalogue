interface CallEntry {
  [key : string ] : Function;
}

export const interleavePromises = (calls : CallEntry) => {
  let call = (key : string, call : Function) => {
     call().then(result => {return {[key] : result}})
           .catch(err => {return {[key] : err}})
  }
  return new Promise((success,rejected) => {
    return Promise.all(Object.keys(calls).map((key)=> call(key,calls[key])))
                  .then((results : any[]) => success(results.reduce((obj, result) => ({...obj, ...result}) ,{})))
                  .catch(err => rejected(err))
  });
}

export interface ComposableFunction<T> {
  (input : T) : T;
}

export function compose<T>(...transforms : ComposableFunction<T>[]){
  return (input : T) : T => {
    return transforms.reduce((result,func) => func(result),input);
  }
}
