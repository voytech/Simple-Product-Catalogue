
interface IActionData<T> {
  data : T;
}

interface IActionPayload<T>{
  payload : IActionData<T>
}

export class ActionData<T> implements IActionData<T>{
  constructor(public data : T){}
}

export class ActionPayload<T> implements IActionPayload<T> {

  payload : IActionData<T>;

  constructor(data : T) {
      this.payload = new ActionData(data);
  }
}
