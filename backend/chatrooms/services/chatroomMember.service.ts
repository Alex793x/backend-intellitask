import { APIError } from 'encore.dev/api';
import { BaseService } from '../../shared/base/baseService';
import {
  chatroomMemberRepository,
  ChatroomMemberRepository,
} from '../repositories/chatroomMember.repository';
import { ChatroomMember, ChatroomMemberRequest, ChatroomType } from '../types';

export class ChatroomMemberService extends BaseService<ChatroomMember, ChatroomMemberRequest> {
  protected constructor(protected readonly repository: ChatroomMemberRepository) {
    super(repository);
  }

  public async createMany(items: ChatroomMemberRequest[]): Promise<ChatroomMember[]> {
    return this.repository.createMany(items);
  }

  public async kickChatroomMember(
    chatroomId: string,
    memberId: string,
    chatroomType: ChatroomType,
    kickerId: string,
    kickStatus: boolean
  ): Promise<void> {
    switch (chatroomType) {
      case ChatroomType.PROJECT_CHATROOM:
        await this.repository.updateOne(memberId, {
          hasLeft: kickStatus,
          chatroomId,
        });
        break;
      case ChatroomType.CHATROOM || ChatroomType.AGENT_CONFIG_SPACE:
        const kicker = await this.repository.findOne(kickerId);

        if (!kicker) {
          throw APIError.permissionDenied('You are not a member of this chatroom');
        }

        if (['ADMIN', 'MANAGER'].includes(kicker?.role)) {
          await this.repository.updateOne(memberId, {
            hasLeft: kickStatus,
            chatroomId,
          });
        }
        break;
      default:
        throw APIError.invalidArgument('Invalid chatroom type');
    }
  }
}

export const chatroomMemberService =
  ChatroomMemberService.getInstance<ChatroomMemberService>(chatroomMemberRepository);
