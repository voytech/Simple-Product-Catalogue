import yup from 'yup';

export interface ImageData {
  name : string;
  data? : any;
}

export interface ProductProperty {
  name : string;
  value : string;
}

export interface Product {
  name: string;
  type: string;
  code ?: string;
  category : string;
  description: string;
  startDate : string;
  effectiveStartDate : string;
  endDate : string;
  effectiveEndDate : string;
  tags ?: string[];
  properties ?: ProductProperty[];
  images ?: string[];
  attachments ?: string[];
}

export const productValidation = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  category: yup.string().required(),
  startDate: yup.date().min(new Date(1990,0,1)).max(new Date(9999,0,1)).default(new Date()),
  endDate: yup.date().min(new Date(1990,0,1)).max(new Date(9999,0,1)).default(new Date(9999,0,1)),
  effectiveStartDate: yup.date().min(new Date(1990,0,1)).max(new Date(9999,0,1)).default(new Date()),
  effectiveEndDate: yup.date().min(new Date(1990,0,1)).max(new Date(9999,0,1)).default(new Date(9999,0,1))
})
