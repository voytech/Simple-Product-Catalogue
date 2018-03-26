export interface IResource{
  name : string;
  data : any;
}

export class Resource implements IResource {
    constructor(public name:string, public data:any){}
}
