import { http } from '../../Config';
import { Category, CategoryTree, CategoryTreeImpl } from './Model'

export const loadCategoryTreesAction = () => {
    let url = (suffix) => 'categories/'+suffix;
    return http.get(url('load'))
}
