import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { voiceProfiles } from '../db/schema';

export class VoiceProfilePreparedStatements extends Singleton {
  constructor() {
    super();
  }

  public readonly findOne = db
    .select()
    .from(voiceProfiles)
    .where(eq(voiceProfiles.id, sql.placeholder('id')))
    .prepare('find_voice_profile_by_id');

  public readonly findAll = db
    .select()
    .from(voiceProfiles)
    .where(eq(voiceProfiles.isActive, true))
    .prepare('find_all_voice_profiles');

  public readonly createOne = db
    .insert(voiceProfiles)
    .values({
      name: sql.placeholder('name'),
      provider: sql.placeholder('provider'),
      voiceId: sql.placeholder('voiceId'),
      settings: sql.placeholder('settings'),
      isActive: sql.placeholder('isActive'),
    })
    .returning()
    .prepare('create_voice_profile');

  public readonly updateOne = db
    .update(voiceProfiles)
    .set({
      name: sql`${sql.placeholder('name')}`,
      provider: sql`${sql.placeholder('provider')}`,
      voiceId: sql`${sql.placeholder('voiceId')}`,
      settings: sql`${sql.placeholder('settings')}`,
      isActive: sql`${sql.placeholder('isActive')}`,
    })
    .where(eq(voiceProfiles.id, sql.placeholder('id')))
    .returning()
    .prepare('update_voice_profile');

  public readonly deleteOne = db
    .delete(voiceProfiles)
    .where(eq(voiceProfiles.id, sql.placeholder('id')))
    .prepare('delete_voice_profile');
}

export const voiceProfilePreparedStatements =
  VoiceProfilePreparedStatements.getInstance<VoiceProfilePreparedStatements>();
