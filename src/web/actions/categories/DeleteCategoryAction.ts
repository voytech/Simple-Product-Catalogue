import { http } from '../../Config';
import { Category } from './Model'

export const deleteCategoryAction = (name : string) => {
    let url = (suffix) => 'categories/'+suffix;
    return http.delete(url('remove/'+name))
}
