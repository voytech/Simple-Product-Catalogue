export interface Category {
  name : string
  description : string
  parent ?: CategoryOrId
  childs ?: CategoryOrId[]

}

export type CategoryOrId = Category | string;

 
