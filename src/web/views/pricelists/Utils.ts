import { PriceList } from '../../actions/pricelists/Model'

export const defaultPriceList : (() => PriceList) = () => {
  return {
    name: '',
    description:'Pricelist assigns prices to products',
    category: 'uncategorised',
    type:'any',
    startDate : '9998-12-31',
    endDate : '9998-12-31',
    effectiveStartDate : '9998-12-31',
    effectiveEndDate : '9998-12-31'
  }
}
