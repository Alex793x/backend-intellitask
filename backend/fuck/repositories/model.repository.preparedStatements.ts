import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { models } from '../db/schema';

export class ModelPreparedStatements extends Singleton {
  constructor() {
    super();
  }

  public readonly findOne = db
    .select()
    .from(models)
    .where(eq(models.id, sql.placeholder('id')))
    .prepare('find_model_by_id');

  public readonly findAll = db
    .select()
    .from(models)
    .where(eq(models.isActive, true))
    .prepare('find_all_models');

  public readonly findByProvider = db
    .select()
    .from(models)
    .where(eq(models.provider, sql.placeholder('provider')))
    .prepare('find_models_by_provider');

  public readonly createOne = db
    .insert(models)
    .values({
      name: sql.placeholder('name'),
      provider: sql.placeholder('provider'),
      apiIdentifier: sql.placeholder('apiIdentifier'),
      modelType: sql.placeholder('modelType'),
      maxTokens: sql.placeholder('maxTokens'),
      isActive: sql.placeholder('isActive'),
    })
    .returning()
    .prepare('create_model');

  public readonly updateOne = db
    .update(models)
    .set({
      name: sql`${sql.placeholder('name')}`,
      provider: sql`${sql.placeholder('provider')}`,
      apiIdentifier: sql`${sql.placeholder('apiIdentifier')}`,
      modelType: sql`${sql.placeholder('modelType')}`,
      maxTokens: sql`${sql.placeholder('maxTokens')}`,
      isActive: sql`${sql.placeholder('isActive')}`,
    })
    .where(eq(models.id, sql.placeholder('id')))
    .returning()
    .prepare('update_model');

  public readonly deleteOne = db
    .delete(models)
    .where(eq(models.id, sql.placeholder('id')))
    .prepare('delete_model');
}

export const modelPreparedStatements =
  ModelPreparedStatements.getInstance<ModelPreparedStatements>();
