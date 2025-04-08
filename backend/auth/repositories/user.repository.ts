import { eq, inArray } from "drizzle-orm";
import { BaseRepository } from "../../shared/base/baseRepository";
import { withErrorHandling } from "../../shared/utils/withErrorHandling";
import { db } from "../db/db";
import { users } from "../db/schema";
import { User, UserCreateRequest } from "../types";
import { userPreparedStatement, UserPreparedStatement } from "./user.repository.preparedStatement";


export class UserRepository extends BaseRepository<User, UserCreateRequest> {
  constructor(private readonly preparedStatement: UserPreparedStatement) {
    super()
  }

  findOne(id: string): Promise<User> {
    return withErrorHandling(async () => {
      const [userResult] = await this.preparedStatement.findOne
        .execute({ id });
      return userResult as User;
    }, "Error finding user");
  }

  findByEmail(email: string): Promise<User> {
    return withErrorHandling(async () => {
      const [userResult] = await this.preparedStatement.findByEmail
        .execute({ email });
      return userResult as User;
    }, "Error finding user");
  }

  findUserByInvitationId(invitationId: string): Promise<User> {
    return withErrorHandling(async () => {
      const [userResult] = await this.preparedStatement.findUserByInvitationId
        .execute({ invitationId });
      return userResult.users as User;
    }, "Error finding user by email");
  }

  findManyByUserIds(userIds: string[]): Promise<User[]> {
    return withErrorHandling(async () => {
      const foundUsers = await db
        .select()
        .from(users)
        .where(inArray(users.id, userIds))
        .execute();
      return foundUsers as User[];
    }, "Error finding users");
  }

  findAll(): Promise<User[]> {
    return withErrorHandling(async () => {
      const result = await this.preparedStatement.findAll.execute();
      return result as User[];
    }, "Error retrieving users");
  }

  createOne(item: UserCreateRequest): Promise<User> {
    throw new Error("Better Auth manages creational.");
  }
  updateOne(id: string, item: UserCreateRequest): Promise<void> {
    throw new Error("Better auth manages the updates.");
  }
  deleteOne(id: string): Promise<void> {
    throw new Error("Better auth manages the deletion.");
  }

}

export const userRepository = UserRepository.getInstance<UserRepository>(userPreparedStatement)
