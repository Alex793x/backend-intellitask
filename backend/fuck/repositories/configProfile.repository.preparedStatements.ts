import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { configProfiles } from '../db/schema';

export class ConfigProfilePreparedStatements extends Singleton {
  constructor() {
    super();
  }

  public readonly findOne = db
    .select()
    .from(configProfiles)
    .where(eq(configProfiles.id, sql.placeholder('id')))
    .prepare('find_config_profile_by_id');

  public readonly findAll = db
    .select()
    .from(configProfiles)
    .where(eq(configProfiles.isActive, true))
    .prepare('find_all_config_profiles');

  public readonly findAllPublic = db
    .select()
    .from(configProfiles)
    .where(eq(configProfiles.isPublic, true))
    .prepare('find_all_public_config_profiles');

  public readonly createOne = db
    .insert(configProfiles)
    .values({
      name: sql.placeholder('name'),
      description: sql.placeholder('description'),
      temperature: sql.placeholder('temperature'),
      topP: sql.placeholder('topP'),
      presencePenalty: sql.placeholder('presencePenalty'),
      frequencyPenalty: sql.placeholder('frequencyPenalty'),
      additionalSettings: sql.placeholder('additionalSettings'),
      creatorId: sql.placeholder('creatorId'),
      isPublic: sql.placeholder('isPublic'),
      isActive: sql.placeholder('isActive'),
    })
    .returning()
    .prepare('create_config_profile');

  public readonly updateOne = db
    .update(configProfiles)
    .set({
      name: sql`${sql.placeholder('name')}`,
      description: sql`${sql.placeholder('description')}`,
      temperature: sql`${sql.placeholder('temperature')}`,
      topP: sql`${sql.placeholder('topP')}`,
      presencePenalty: sql`${sql.placeholder('presencePenalty')}`,
      frequencyPenalty: sql`${sql.placeholder('frequencyPenalty')}`,
      additionalSettings: sql`${sql.placeholder('additionalSettings')}`,
      isPublic: sql`${sql.placeholder('isPublic')}`,
      isActive: sql`${sql.placeholder('isActive')}`,
    })
    .where(eq(configProfiles.id, sql.placeholder('id')))
    .returning()
    .prepare('update_config_profile');

  public readonly deleteOne = db
    .delete(configProfiles)
    .where(eq(configProfiles.id, sql.placeholder('id')))
    .prepare('delete_config_profile');
}

export const configProfilePreparedStatements =
  ConfigProfilePreparedStatements.getInstance<ConfigProfilePreparedStatements>();
