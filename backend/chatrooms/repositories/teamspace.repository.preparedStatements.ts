import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import {
  teamspaces,
  organizationTeamspacesRelations,
  teamspaceMembers,
  projectMembers,
  chatroomMembers,
} from '../db/schema';

export class TeamspacePreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  public readonly findOne = db.query.teamspaces
    .findFirst({
      where: eq(teamspaces.id, sql.placeholder('id')),
      with: {
        members: true,
        projects: true,
        files: true,
        organizations: true,
      },
    })
    .prepare('find_teamspace_by_id');

  public readonly findAll = db.query.teamspaces
    .findMany({
      with: {
        members: true,
        projects: {
          with: {
            chatrooms: true,
          },
        },
      },
    })
    .prepare('find_all_teamspaces');

  public readonly findByOrganizationId = db.query.organizationTeamspacesRelations
    .findMany({
      where: eq(organizationTeamspacesRelations.organizationId, sql.placeholder('organizationId')),
      with: {
        teamspace: {
          with: {
            members: true,
            projects: {
              with: {
                chatrooms: {
                  with: {
                    members: true,
                    organizations: true,
                    files: true,
                  },
                },
                members: true,
                files: true,
              },
            },
            files: true,
            organizations: true,
          },
        },
      },
    })
    .prepare('find_teamspaces_by_organization_id');

  public readonly createOne = db
    .insert(teamspaces)
    .values({
      name: sql`${sql.placeholder('name')}`,
      description: sql`${sql.placeholder('description')}`,
      context: sql`${sql.placeholder('context')}`,
      creatorId: sql`${sql.placeholder('creatorId')}`,
    })
    .returning()
    .prepare('create_teamspace');

  public readonly createTeamspaceOrganizationRelation = db
    .insert(organizationTeamspacesRelations)
    .values({
      teamspaceId: sql`${sql.placeholder('teamspaceId')}`,
      organizationId: sql`${sql.placeholder('organizationId')}`,
    })
    .prepare('create_teamspace_organization_relation');

  public readonly updateOne = db
    .update(teamspaces)
    .set({
      name: sql`${sql.placeholder('name')}`,
      description: sql`${sql.placeholder('description')}`,
      context: sql`${sql.placeholder('context')}`,
    })
    .where(eq(teamspaces.id, sql.placeholder('id')))
    .returning()
    .prepare('update_teamspace');

  public readonly deleteOne = db
    .delete(teamspaces)
    .where(eq(teamspaces.id, sql.placeholder('id')))
    .returning()
    .prepare('delete_teamspace');

  public readonly findByUserId = db.query.teamspaceMembers
    .findMany({
      where: eq(teamspaceMembers.userId, sql.placeholder('userId')),
      with: {
        teamspace: {
          with: {
            members: true,
            projects: {
              with: {
                members: {
                  where: eq(projectMembers.hasLeft, false),
                },
                chatrooms: {
                  with: {
                    members: {
                      where: eq(chatroomMembers.hasLeft, false),
                    },
                    files: true,
                    organizations: true,
                  },
                },
                files: true,
              },
            },
            files: true,
            organizations: true,
          },
        },
      },
    })
    .prepare('find_teamspaces_by_user_id');
}

export const teamspacePreparedStatements =
  TeamspacePreparedStatements.getInstance<TeamspacePreparedStatements>();
