import { Product } from '../products/Model'

export interface PriceListItem  {
    name: string;
    code: string;
    product : Product;
    priceList : PriceList;
    price: number;
}

export interface PriceList  {
    name: string;
    description: string;
    code ?: string;
    category: string;
    items ?: PriceListItem[];
    tags ?: string;
}
