import { eq, sql, or } from 'drizzle-orm';
import { agentFunctionAssignments, agents } from '../db/schema';
import { db } from '../db/db';
import Singleton from '../../shared/base/singleton';

export class AgentPreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  public readonly findAgent = db
    .select()
    .from(agents)
    .where(eq(agents.id, sql.placeholder('id')))
    .prepare('find_agent');

  public readonly findAllPublicAgentsWithRelations = db.query.agents
    .findMany({
      where: or(eq(agents.isPublic, true), eq(agents.creatorId, sql.placeholder('creator_id'))),
      with: {
        model: true,
        config: true,
        instructionSet: true,
        voice: true,
        functionAssignments: {
          with: {
            function: true,
          },
        },
      },
    })
    .prepare('find_all_public_agents_with_relations');

  public readonly findAgentWithRelations = db.query.agents
    .findFirst({
      where: eq(agents.id, sql.placeholder('id')),
      with: {
        model: true,
        config: true,
        instructionSet: true,
        voice: true,
        functionAssignments: {
          with: {
            function: true,
          },
        },
      },
    })
    .prepare('find_agent_with_relations');

  public readonly createAgent = db
    .insert(agents)
    .values({
      creatorId: sql.placeholder('creatorId'),
      name: sql.placeholder('name'),
      description: sql.placeholder('description'),
      modelId: sql.placeholder('modelId'),
      configId: sql.placeholder('configId'),
      instructionSetId: sql.placeholder('instructionSetId'),
      voiceId: sql.placeholder('voiceId'),
      agentType: sql.placeholder('agentType'),
      isPublic: sql.placeholder('isPublic'),
      isActive: sql.placeholder('isActive'),
    })
    .returning()
    .prepare('create_agent');

  public readonly updateAgent = db
    .update(agents)
    .set({
      name: sql`${sql.placeholder('name')}`,
      description: sql`${sql.placeholder('description')}`,
      modelId: sql`${sql.placeholder('modelId')}`,
      configId: sql`${sql.placeholder('configId')}`,
      instructionSetId: sql`${sql.placeholder('instructionSetId')}`,
      voiceId: sql`NULLIF(${sql.placeholder('voiceId')}, '')::uuid`,
      isActive: sql`${sql.placeholder('isActive')}`,
      isPublic: sql`${sql.placeholder('isPublic')}`,
      agentType: sql`${sql.placeholder('agentType')}`,
    })
    .where(eq(agents.id, sql.placeholder('id')))
    .returning()
    .prepare('update_agent');

  public readonly deleteAgent = db
    .delete(agents)
    .where(eq(agents.id, sql.placeholder('id')))
    .prepare('delete_agent');

  public readonly assignFunctionToAgent = db
    .insert(agentFunctionAssignments)
    .values({
      agentId: sql.placeholder('agentId'),
      functionId: sql.placeholder('functionId'),
    })
    .prepare('assign_function_to_agent');
}

export const agentPreparedStatements =
  AgentPreparedStatements.getInstance<AgentPreparedStatements>();
