import { BaseRepository } from "../../shared/base/baseRepository";
import { RestrictedAiProvider, RestrictedAiProviderRequest } from "../types";



export class RestrictedAiProvidersRepository extends BaseRepository<RestrictedAiProvider, RestrictedAiProviderRequest>{

  constructor() {
    super()
  }

  findOne(id: string): Promise<RestrictedAiProvider> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<RestrictedAiProvider[]> {
    throw new Error("Method not implemented.");
  }
  createOne(item: RestrictedAiProviderRequest): Promise<RestrictedAiProvider> {
    throw new Error("Method not implemented.");
  }
  updateOne(id: string, item: RestrictedAiProviderRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
