import { eq, sql, and } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { agentFunctions, agentFunctionAssignments } from '../db/schema';

export class AgentFunctionsPreparedStatements extends Singleton {
  constructor() {
    super();
  }

  // Find a specific function by ID
  public readonly findOne = db
    .select()
    .from(agentFunctions)
    .where(eq(agentFunctions.id, sql.placeholder('id')))
    .prepare('find_function_by_id');

  // Find all functions
  public readonly findAll = db.select().from(agentFunctions).prepare('find_all_functions');

  // Find all public functions
  public readonly findAllByIsPublic = db
    .select()
    .from(agentFunctions)
    .where(eq(agentFunctions.isPublic, true))
    .prepare('find_all_public_functions');

  // Find functions for a specific agent
  public readonly findOneByAgentId = db
    .select({
      function: agentFunctions,
    })
    .from(agentFunctions)
    .innerJoin(agentFunctionAssignments, eq(agentFunctions.id, agentFunctionAssignments.functionId))
    .where(eq(agentFunctionAssignments.agentId, sql.placeholder('agentId')))
    .prepare('find_functions_by_agent_id');

  // Create a new function
  public readonly createOne = db
    .insert(agentFunctions)
    .values({
      name: sql.placeholder('name'),
      description: sql.placeholder('description'),
      parameters: sql.placeholder('parameters'),
      creatorId: sql.placeholder('creatorId'),
      isPublic: sql.placeholder('isPublic'),
    })
    .returning()
    .prepare('create_function');

  // Update a function
  public readonly updateOne = db
    .update(agentFunctions)
    .set({
      name: sql`${sql.placeholder('name')}`,
      description: sql`${sql.placeholder('description')}`,
      parameters: sql`${sql.placeholder('parameters')}`,
      isPublic: sql`${sql.placeholder('isPublic')}`,
    })
    .where(eq(agentFunctions.id, sql.placeholder('id')))
    .returning()
    .prepare('update_function');

  // Delete a function
  public readonly deleteOne = db
    .delete(agentFunctions)
    .where(eq(agentFunctions.id, sql.placeholder('id')))
    .prepare('delete_function');

  // Assign a function to an agent
  public readonly assignFunctionToAgent = db
    .insert(agentFunctionAssignments)
    .values({
      agentId: sql.placeholder('agentId'),
      functionId: sql.placeholder('functionId'),
    })
    .prepare('assign_function_to_agent');

  // Remove a function assignment from an agent
  public readonly removeFunctionFromAgent = db
    .delete(agentFunctionAssignments)
    .where(
      and(
        eq(agentFunctionAssignments.agentId, sql.placeholder('agentId')),
        eq(agentFunctionAssignments.functionId, sql.placeholder('functionId'))
      )
    )
    .prepare('remove_function_from_agent');

  // Clear all function assignments for an agent
  public readonly clearAgentFunctions = db
    .delete(agentFunctionAssignments)
    .where(eq(agentFunctionAssignments.agentId, sql.placeholder('agentId')))
    .prepare('clear_agent_functions');
}

export const agentFunctionsPreparedStatements =
  AgentFunctionsPreparedStatements.getInstance<AgentFunctionsPreparedStatements>();
