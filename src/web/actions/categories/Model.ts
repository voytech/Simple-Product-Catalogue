export interface Category {
  name : string;
  description : string;
  parent : string;
}

export interface CategoryTree {
  category : Category,
  childs : CategoryTree[]
}

export class CategoryTreeImpl implements CategoryTree {
  childs : CategoryTree[]
  constructor(public category : Category){
    this.childs = []
  }
}
