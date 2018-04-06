import { BaseCRUDService } from '../services/BaseCRUDService';
import { Model, Document } from 'mongoose';

export interface ServiceAwareRoute<T extends Document,S extends BaseCRUDService<T>> {
  createService(model : Model<T>,identityField : string) : BaseCRUDService<T>
}
