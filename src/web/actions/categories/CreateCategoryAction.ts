import { http } from '../../Config';
import { Category } from './Model'

export const createCategoryAction = (category : Category) => {
    let url = (suffix) => 'categories/'+suffix;
    return http.post(url('create'),JSON.stringify(category))
}
