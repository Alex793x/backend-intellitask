import { eq, sql } from "drizzle-orm";
import Singleton from "../../shared/base/singleton";
import { db } from "../db/db";
import { invitations, users } from "../db/schema";

export class UserPreparedStatement extends Singleton {
  constructor() {
    super();
  }

  public readonly findOne = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder("id")))
  .prepare("find_user");

  public readonly findByEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("find_user");

  public readonly findUserByInvitationId = db
  .select()
  .from(invitations)
  .where(eq(invitations.id, sql.placeholder("invitationId")))
  .innerJoin(users, eq(invitations.email, users.email))
  .prepare("find_user_by_invitation_id");


  public readonly findAll = db
    .select()
    .from(users)
    .prepare("find_all_users");
}

export const userPreparedStatement = UserPreparedStatement.getInstance<UserPreparedStatement>();
