import { http } from '../../Config';
import { Category } from './Model'

export const loadCategoriesAction = () => {
    let url = (suffix) => 'categories/'+suffix;
    return http.get(url('load'))
}
