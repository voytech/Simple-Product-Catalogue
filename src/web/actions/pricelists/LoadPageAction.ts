import { http } from '../../Config';

export const loadPricelistsPageAction = (offset,pageSize) => {
    let url = (suffix) => 'pricelists/'+suffix;
    return http.get(url('pageWithTotal?offset='+offset+'&size='+pageSize))
}
