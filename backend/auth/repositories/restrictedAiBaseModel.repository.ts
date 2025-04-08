import { BaseRepository } from '../../shared/base/baseRepository';
import {
  RestrictedAiBaseModel,
  RestrictedAiBaseModelRequest,
} from '../types';

export class RestrictedAiBaseModelRepository extends BaseRepository<
  RestrictedAiBaseModel,
  RestrictedAiBaseModelRequest
> {

  constructor() {
    super();
  }


  findOne(id: string): Promise<RestrictedAiBaseModel> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<RestrictedAiBaseModel[]> {
    throw new Error('Method not implemented.');
  }
  createOne(item: RestrictedAiBaseModelRequest): Promise<RestrictedAiBaseModel> {
    throw new Error('Method not implemented.');
  }
  updateOne(id: string, item: RestrictedAiBaseModelRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

