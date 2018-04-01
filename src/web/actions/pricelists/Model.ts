import { Product } from '../products/Model'

export interface PriceListItem  {
    name : string;
    code ?: string;
    product : Product;
    priceList : PriceList;
    price: number;
}

export interface PriceAssignement {
    priceList:string;
    product:string;
    price:number;
}

export interface PriceList  {
    name: string;
    description: string;
    code ?: string;
    category: string;
    type: string;
    startDate : string;
    effectiveStartDate : string;
    endDate : string;
    effectiveEndDate : string;
    items ?: PriceListItem[];
    tags ?: string;
}
