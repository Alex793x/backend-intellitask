import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { instructionSets } from '../db/schema';

// TODO THIS IS NOT DONE CORRECLTY PROPERPLY JUST THOUGHT THIS WOULD BE BETTER THAN AN EMPTY SHEET!!!
// ONE LOVE REALKODER xD <333333
export class InstructionSetPreparedStatements extends Singleton {
  constructor() {
    super();
  }
  public readonly findOne = db
    .select()
    .from(instructionSets)
    .where(eq(instructionSets.id, sql.placeholder('id')))
    .prepare('find_instruction_set_by_id');

  public readonly findAll = db
    .select()
    .from(instructionSets)
    .where(eq(instructionSets.isActive, true))
    .prepare('find_all_instruction_sets');

  public readonly findAllPublic = db
    .select()
    .from(instructionSets)
    .where(eq(instructionSets.isPublic, true))
    .prepare('find_all_public_instruction_sets');

  public readonly createOne = db
    .insert(instructionSets)
    .values({
      name: sql`${sql.placeholder('name')}`,
      instructions: sql`${sql.placeholder('instructions')}`,
      creatorId: sql`${sql.placeholder('creatorId')}`,
      isPublic: sql`${sql.placeholder('isPublic')}`,
      isActive: sql`${sql.placeholder('isActive')}`,
    })
    .returning()
    .prepare('create_instruction_set');

  public readonly updateOne = db
    .update(instructionSets)
    .set({
      name: sql`${sql.placeholder('name')}`,
      instructions: sql`${sql.placeholder('instructions')}`,
      creatorId: sql`${sql.placeholder('creatorId')}`,
      isPublic: sql`${sql.placeholder('isPublic')}`,
      isActive: sql`${sql.placeholder('isActive')}`,
    })
    .where(eq(instructionSets.id, sql.placeholder('id')))
    .returning()
    .prepare('update_instruction_set');

  public readonly deleteOne = db
    .delete(instructionSets)
    .where(eq(instructionSets.id, sql.placeholder('id')))
    .prepare('delete_instruction_set');
}

export const instructionSetPreparedStatements =
  InstructionSetPreparedStatements.getInstance<InstructionSetPreparedStatements>();
