import { eq, sql } from 'drizzle-orm';
import Singleton from '../../shared/base/singleton';
import { db } from '../db/db';
import { projects, projectMembers, teamspaceMembers } from '../db/schema';

export class ProjectPreparedStatements extends Singleton {
  private constructor() {
    super();
  }

  public readonly findOne = db.query.projects
    .findFirst({
      where: eq(projects.id, sql.placeholder('id')),
      with: {
        members: true,
        chatrooms: {
          with: {
            members: true,
            files: true,
            organizations: true,
          },
        },
        files: true,
      },
    })
    .prepare('find_project_by_id');

  public readonly findAll = db.query.projects
    .findMany({
      with: {
        members: true,
        chatrooms: {
          with: {
            members: true,
            files: true,
            organizations: true,
          },
        },
        files: true,
      },
    })
    .prepare('find_all_projects');

  public readonly findByTeamspaceId = db.query.projects
    .findMany({
      where: eq(projects.teamspaceId, sql.placeholder('teamspaceId')),
      with: {
        members: true,
        chatrooms: {
          with: {
            members: true,
            files: true,
            organizations: true,
          },
        },
        files: true,
      },
    })
    .prepare('find_projects_by_teamspace_id');

  public readonly createOne = db
    .insert(projects)
    .values({
      teamspaceId: sql`${sql.placeholder('teamspaceId')}`,
      name: sql`${sql.placeholder('name')}`,
      context: sql`${sql.placeholder('context')}`,
      description: sql`${sql.placeholder('description')}`,
      creatorId: sql`${sql.placeholder('creatorId')}`,
      isPrivate: sql`${sql.placeholder('isPrivate')}`,
    })
    .returning()
    .prepare('create_project');

  public readonly updateOne = db
    .update(projects)
    .set({
      name: sql`${sql.placeholder('name')}`,
      context: sql`${sql.placeholder('context')}`,
      description: sql`${sql.placeholder('description')}`,
      isPrivate: sql`${sql.placeholder('isPrivate')}`,
    })
    .where(eq(projects.id, sql.placeholder('id')))
    .returning()
    .prepare('update_project');

  public readonly deleteOne = db
    .delete(projects)
    .where(eq(projects.id, sql.placeholder('id')))
    .returning()
    .prepare('delete_project');

  // Find projects where user is directly a member
  public readonly findByUserIdDirect = db.query.projectMembers
    .findMany({
      where: eq(projectMembers.userId, sql.placeholder('userId')),
      with: {
        project: {
          with: {
            members: true,
            teamspace: true,
            files: true,
            chatrooms: {
              with: {
                members: true,
                organizations: true,
                files: true,
              },
            },
          },
        },
      },
    })
    .prepare('find_projects_by_user_id_direct');

  // Find all projects in teamspaces where user is a member
  public readonly findByUserIdInTeamspaces = db.query.teamspaceMembers
    .findMany({
      where: eq(teamspaceMembers.userId, sql.placeholder('userId')),
      with: {
        teamspace: {
          with: {
            projects: {
              where: eq(projects.isPrivate, false), // Only include non-private projects
              with: {
                members: true,
                chatrooms: {
                  with: {
                    members: true,
                    files: true,
                    organizations: true,
                  },
                },
                files: true,
              },
            },
          },
        },
      },
    })
    .prepare('find_projects_by_user_id_in_teamspaces');
}

export const projectPreparedStatements =
  ProjectPreparedStatements.getInstance<ProjectPreparedStatements>();
