import { registerGateways, registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";

import { gateway as api_gatewayGW } from "../../../../backend/auth/auth";
import { getUserById as auth_getUserByIdImpl0 } from "../../../../backend/auth/api/accessManagement.api";
import { getAllUsers as auth_getAllUsersImpl1 } from "../../../../backend/auth/api/accessManagement.api";
import { getUsersByIds as auth_getUsersByIdsImpl2 } from "../../../../backend/auth/api/accessManagement.api";
import { getOrganizationById as auth_getOrganizationByIdImpl3 } from "../../../../backend/auth/api/accessManagement.api";
import { getAllOrganizations as auth_getAllOrganizationsImpl4 } from "../../../../backend/auth/api/accessManagement.api";
import { getOrganizationsAttendedByUser as auth_getOrganizationsAttendedByUserImpl5 } from "../../../../backend/auth/api/accessManagement.api";
import { getIfUserHasActiveOrganization as auth_getIfUserHasActiveOrganizationImpl6 } from "../../../../backend/auth/api/accessManagement.api";
import { getOrganizationInvitationsByEmail as auth_getOrganizationInvitationsByEmailImpl7 } from "../../../../backend/auth/api/accessManagement.api";
import { authRouter as auth_authRouterImpl8 } from "../../../../backend/auth/api/auth.api";
import { handler as auth_handlerImpl9 } from "../../../../backend/auth/api/auth.api";
import { createChatroom as chatrooms_createChatroomImpl10 } from "../../../../backend/chatrooms/api/chatroom.api";
import { getChatrooms as chatrooms_getChatroomsImpl11 } from "../../../../backend/chatrooms/api/chatroom.api";
import { getParticipatingChatroomsWithLatestMessages as chatrooms_getParticipatingChatroomsWithLatestMessagesImpl12 } from "../../../../backend/chatrooms/api/chatroom.api";
import { getChatroom as chatrooms_getChatroomImpl13 } from "../../../../backend/chatrooms/api/chatroom.api";
import { updateChatroom as chatrooms_updateChatroomImpl14 } from "../../../../backend/chatrooms/api/chatroom.api";
import { deleteChatroom as chatrooms_deleteChatroomImpl15 } from "../../../../backend/chatrooms/api/chatroom.api";
import { createOneTeamspaceFile as chatrooms_createOneTeamspaceFileImpl16 } from "../../../../backend/chatrooms/api/fileRelation.api";
import { createOneProjectFile as chatrooms_createOneProjectFileImpl17 } from "../../../../backend/chatrooms/api/fileRelation.api";
import { createOneChatroomFile as chatrooms_createOneChatroomFileImpl18 } from "../../../../backend/chatrooms/api/fileRelation.api";
import { deleteOneTeamspaceFile as chatrooms_deleteOneTeamspaceFileImpl19 } from "../../../../backend/chatrooms/api/fileRelation.api";
import { deleteOneProjectFile as chatrooms_deleteOneProjectFileImpl20 } from "../../../../backend/chatrooms/api/fileRelation.api";
import { deleteOneChatroomFile as chatrooms_deleteOneChatroomFileImpl21 } from "../../../../backend/chatrooms/api/fileRelation.api";
import { createProject as chatrooms_createProjectImpl22 } from "../../../../backend/chatrooms/api/project.api";
import { changeProjectMemberStatus as chatrooms_changeProjectMemberStatusImpl23 } from "../../../../backend/chatrooms/api/project.api";
import { getProjects as chatrooms_getProjectsImpl24 } from "../../../../backend/chatrooms/api/project.api";
import { getProject as chatrooms_getProjectImpl25 } from "../../../../backend/chatrooms/api/project.api";
import { updateProject as chatrooms_updateProjectImpl26 } from "../../../../backend/chatrooms/api/project.api";
import { deleteProject as chatrooms_deleteProjectImpl27 } from "../../../../backend/chatrooms/api/project.api";
import { getUserProjects as chatrooms_getUserProjectsImpl28 } from "../../../../backend/chatrooms/api/project.api";
import { createTeamspace as chatrooms_createTeamspaceImpl29 } from "../../../../backend/chatrooms/api/teamspace.api";
import { getTeamspaces as chatrooms_getTeamspacesImpl30 } from "../../../../backend/chatrooms/api/teamspace.api";
import { getTeamspace as chatrooms_getTeamspaceImpl31 } from "../../../../backend/chatrooms/api/teamspace.api";
import { getParticipatingTeamspaces as chatrooms_getParticipatingTeamspacesImpl32 } from "../../../../backend/chatrooms/api/teamspace.api";
import { updateTeamspace as chatrooms_updateTeamspaceImpl33 } from "../../../../backend/chatrooms/api/teamspace.api";
import { changeTeamspaceMemberStatus as chatrooms_changeTeamspaceMemberStatusImpl34 } from "../../../../backend/chatrooms/api/teamspace.api";
import { deleteTeamspace as chatrooms_deleteTeamspaceImpl35 } from "../../../../backend/chatrooms/api/teamspace.api";
import { getTeamspaceMembers as chatrooms_getTeamspaceMembersImpl36 } from "../../../../backend/chatrooms/api/teamspaceMember.api";
import { addTeamspaceMember as chatrooms_addTeamspaceMemberImpl37 } from "../../../../backend/chatrooms/api/teamspaceMember.api";
import { updateTeamspaceMember as chatrooms_updateTeamspaceMemberImpl38 } from "../../../../backend/chatrooms/api/teamspaceMember.api";
import { removeTeamspaceMember as chatrooms_removeTeamspaceMemberImpl39 } from "../../../../backend/chatrooms/api/teamspaceMember.api";
import { chat as chats_chatImpl40 } from "../../../../backend/chats/api/chat.api";
import { findLatestChatMessageByChatroomIds as chats_findLatestChatMessageByChatroomIdsImpl41 } from "../../../../backend/chats/api/chatmessage.api";
import { findChatMessagesByChatroomId as chats_findChatMessagesByChatroomIdImpl42 } from "../../../../backend/chats/api/chatmessage.api";
import { getChatMessageReactions as chats_getChatMessageReactionsImpl43 } from "../../../../backend/chats/api/chatmessageReactions.api";
import { createChatMessageReactions as chats_createChatMessageReactionsImpl44 } from "../../../../backend/chats/api/chatmessageReactions.api";
import { updateChatMessageReaction as chats_updateChatMessageReactionImpl45 } from "../../../../backend/chats/api/chatmessageReactions.api";
import { deleteChatMessageReaction as chats_deleteChatMessageReactionImpl46 } from "../../../../backend/chats/api/chatmessageReactions.api";
import { eventsStream as eventStreamer_eventsStreamImpl47 } from "../../../../backend/eventStreamer/api/events.api";
import { stats as eventStreamer_statsImpl48 } from "../../../../backend/eventStreamer/api/events.api";
import { getFilesByIds as fileManagement_getFilesByIdsImpl49 } from "../../../../backend/fileManagement/api/fileManagement.api";
import { uploadFilesWithMetadata as fileManagement_uploadFilesWithMetadataImpl50 } from "../../../../backend/fileManagement/api/fileManagement.api";
import { deleteOneFile as fileManagement_deleteOneFileImpl51 } from "../../../../backend/fileManagement/api/fileManagement.api";
import { getPublicAgents as fuck_getPublicAgentsImpl52 } from "../../../../backend/fuck/api/agent.api";
import { getAgent as fuck_getAgentImpl53 } from "../../../../backend/fuck/api/agent.api";
import { createAgent as fuck_createAgentImpl54 } from "../../../../backend/fuck/api/agent.api";
import { updateAgent as fuck_updateAgentImpl55 } from "../../../../backend/fuck/api/agent.api";
import { deleteAgent as fuck_deleteAgentImpl56 } from "../../../../backend/fuck/api/agent.api";
import { chatAgent as fuck_chatAgentImpl57 } from "../../../../backend/fuck/api/agent.api";
import { getPublicConfigProfiles as fuck_getPublicConfigProfilesImpl58 } from "../../../../backend/fuck/api/configProfile.api";
import { getConfigProfile as fuck_getConfigProfileImpl59 } from "../../../../backend/fuck/api/configProfile.api";
import { createConfigProfile as fuck_createConfigProfileImpl60 } from "../../../../backend/fuck/api/configProfile.api";
import { updateConfigProfile as fuck_updateConfigProfileImpl61 } from "../../../../backend/fuck/api/configProfile.api";
import { deleteConfigProfile as fuck_deleteConfigProfileImpl62 } from "../../../../backend/fuck/api/configProfile.api";
import { getPublicInstructionSets as fuck_getPublicInstructionSetsImpl63 } from "../../../../backend/fuck/api/instructionSet.api";
import { getInstructionSet as fuck_getInstructionSetImpl64 } from "../../../../backend/fuck/api/instructionSet.api";
import { createInstructionSet as fuck_createInstructionSetImpl65 } from "../../../../backend/fuck/api/instructionSet.api";
import { updateInstructionSet as fuck_updateInstructionSetImpl66 } from "../../../../backend/fuck/api/instructionSet.api";
import { deleteInstructionSet as fuck_deleteInstructionSetImpl67 } from "../../../../backend/fuck/api/instructionSet.api";
import { getModels as fuck_getModelsImpl68 } from "../../../../backend/fuck/api/model.api";
import { getModelsByProvider as fuck_getModelsByProviderImpl69 } from "../../../../backend/fuck/api/model.api";
import { getModel as fuck_getModelImpl70 } from "../../../../backend/fuck/api/model.api";
import { createModel as fuck_createModelImpl71 } from "../../../../backend/fuck/api/model.api";
import { updateModel as fuck_updateModelImpl72 } from "../../../../backend/fuck/api/model.api";
import { deleteModel as fuck_deleteModelImpl73 } from "../../../../backend/fuck/api/model.api";
import { getVoiceProfiles as fuck_getVoiceProfilesImpl74 } from "../../../../backend/fuck/api/voiceProfile.api";
import { getVoiceProfile as fuck_getVoiceProfileImpl75 } from "../../../../backend/fuck/api/voiceProfile.api";
import { createVoiceProfile as fuck_createVoiceProfileImpl76 } from "../../../../backend/fuck/api/voiceProfile.api";
import { updateVoiceProfile as fuck_updateVoiceProfileImpl77 } from "../../../../backend/fuck/api/voiceProfile.api";
import { deleteVoiceProfile as fuck_deleteVoiceProfileImpl78 } from "../../../../backend/fuck/api/voiceProfile.api";
import { getSupervisor as openai_getSupervisorImpl79 } from "../../../../backend/openai/api/openai.api";
import { getMarketingAdvisor as openai_getMarketingAdvisorImpl80 } from "../../../../backend/openai/api/openai.api";
import { getProductivityCoach as openai_getProductivityCoachImpl81 } from "../../../../backend/openai/api/openai.api";
import { getTechAdvisor as openai_getTechAdvisorImpl82 } from "../../../../backend/openai/api/openai.api";
import { getHRConsultant as openai_getHRConsultantImpl83 } from "../../../../backend/openai/api/openai.api";
import { getFinancialAdvisor as openai_getFinancialAdvisorImpl84 } from "../../../../backend/openai/api/openai.api";
import { getProjectManager as openai_getProjectManagerImpl85 } from "../../../../backend/openai/api/openai.api";
import { getCommunicationCoach as openai_getCommunicationCoachImpl86 } from "../../../../backend/openai/api/openai.api";
import { getLegalAdvisor as openai_getLegalAdvisorImpl87 } from "../../../../backend/openai/api/openai.api";
import { getInnovationConsultant as openai_getInnovationConsultantImpl88 } from "../../../../backend/openai/api/openai.api";
import { getDataAnalyst as openai_getDataAnalystImpl89 } from "../../../../backend/openai/api/openai.api";
import { getWellnessCoach as openai_getWellnessCoachImpl90 } from "../../../../backend/openai/api/openai.api";
import { openaiStream as openai_openaiStreamImpl91 } from "../../../../backend/openai/api/openai.api";
import "../../../../backend/email/messaging/email.subscriber.api";
import "../../../../backend/email/messaging/email.subscriber.api";
import "../../../../backend/email/messaging/email.subscriber.api";
import "../../../../backend/eventStreamer/messaging/events.messaging";
import * as auth_service from "../../../../backend/auth/encore.service";
import * as chatrooms_service from "../../../../backend/chatrooms/encore.service";
import * as fileManagement_service from "../../../../backend/fileManagement/encore.service";
import * as chats_service from "../../../../backend/chats/encore.service";
import * as fuck_service from "../../../../backend/fuck/encore.service";
import * as openai_service from "../../../../backend/openai/encore.service";
import * as eventStreamer_service from "../../../../backend/eventStreamer/encore.service";
import * as email_service from "../../../../backend/email/encore.service";

const gateways: any[] = [
    api_gatewayGW,
];

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "auth",
            name:              "getUserById",
            handler:           auth_getUserByIdImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getAllUsers",
            handler:           auth_getAllUsersImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getUsersByIds",
            handler:           auth_getUsersByIdsImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getOrganizationById",
            handler:           auth_getOrganizationByIdImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getAllOrganizations",
            handler:           auth_getAllOrganizationsImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getOrganizationsAttendedByUser",
            handler:           auth_getOrganizationsAttendedByUserImpl5,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getIfUserHasActiveOrganization",
            handler:           auth_getIfUserHasActiveOrganizationImpl6,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getOrganizationInvitationsByEmail",
            handler:           auth_getOrganizationInvitationsByEmailImpl7,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "authRouter",
            handler:           auth_authRouterImpl8,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "handler",
            handler:           auth_handlerImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createChatroom",
            handler:           chatrooms_createChatroomImpl10,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getChatrooms",
            handler:           chatrooms_getChatroomsImpl11,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getParticipatingChatroomsWithLatestMessages",
            handler:           chatrooms_getParticipatingChatroomsWithLatestMessagesImpl12,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getChatroom",
            handler:           chatrooms_getChatroomImpl13,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateChatroom",
            handler:           chatrooms_updateChatroomImpl14,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteChatroom",
            handler:           chatrooms_deleteChatroomImpl15,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createOneTeamspaceFile",
            handler:           chatrooms_createOneTeamspaceFileImpl16,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createOneProjectFile",
            handler:           chatrooms_createOneProjectFileImpl17,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createOneChatroomFile",
            handler:           chatrooms_createOneChatroomFileImpl18,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteOneTeamspaceFile",
            handler:           chatrooms_deleteOneTeamspaceFileImpl19,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteOneProjectFile",
            handler:           chatrooms_deleteOneProjectFileImpl20,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteOneChatroomFile",
            handler:           chatrooms_deleteOneChatroomFileImpl21,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createProject",
            handler:           chatrooms_createProjectImpl22,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "changeProjectMemberStatus",
            handler:           chatrooms_changeProjectMemberStatusImpl23,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getProjects",
            handler:           chatrooms_getProjectsImpl24,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getProject",
            handler:           chatrooms_getProjectImpl25,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateProject",
            handler:           chatrooms_updateProjectImpl26,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteProject",
            handler:           chatrooms_deleteProjectImpl27,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getUserProjects",
            handler:           chatrooms_getUserProjectsImpl28,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createTeamspace",
            handler:           chatrooms_createTeamspaceImpl29,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getTeamspaces",
            handler:           chatrooms_getTeamspacesImpl30,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getTeamspace",
            handler:           chatrooms_getTeamspaceImpl31,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getParticipatingTeamspaces",
            handler:           chatrooms_getParticipatingTeamspacesImpl32,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateTeamspace",
            handler:           chatrooms_updateTeamspaceImpl33,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "changeTeamspaceMemberStatus",
            handler:           chatrooms_changeTeamspaceMemberStatusImpl34,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteTeamspace",
            handler:           chatrooms_deleteTeamspaceImpl35,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getTeamspaceMembers",
            handler:           chatrooms_getTeamspaceMembersImpl36,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "addTeamspaceMember",
            handler:           chatrooms_addTeamspaceMemberImpl37,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateTeamspaceMember",
            handler:           chatrooms_updateTeamspaceMemberImpl38,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "removeTeamspaceMember",
            handler:           chatrooms_removeTeamspaceMemberImpl39,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "chat",
            handler:           chats_chatImpl40,
            raw:               false,
            streamingRequest:  true,
            streamingResponse: true,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":true,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "findLatestChatMessageByChatroomIds",
            handler:           chats_findLatestChatMessageByChatroomIdsImpl41,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "findChatMessagesByChatroomId",
            handler:           chats_findChatMessagesByChatroomIdImpl42,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "getChatMessageReactions",
            handler:           chats_getChatMessageReactionsImpl43,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "createChatMessageReactions",
            handler:           chats_createChatMessageReactionsImpl44,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "updateChatMessageReaction",
            handler:           chats_updateChatMessageReactionImpl45,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "deleteChatMessageReaction",
            handler:           chats_deleteChatMessageReactionImpl46,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "eventStreamer",
            name:              "eventsStream",
            handler:           eventStreamer_eventsStreamImpl47,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: true,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":true,"tags":[]},
        middlewares: eventStreamer_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "eventStreamer",
            name:              "stats",
            handler:           eventStreamer_statsImpl48,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: eventStreamer_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fileManagement",
            name:              "getFilesByIds",
            handler:           fileManagement_getFilesByIdsImpl49,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fileManagement_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fileManagement",
            name:              "uploadFilesWithMetadata",
            handler:           fileManagement_uploadFilesWithMetadataImpl50,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: fileManagement_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fileManagement",
            name:              "deleteOneFile",
            handler:           fileManagement_deleteOneFileImpl51,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fileManagement_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getPublicAgents",
            handler:           fuck_getPublicAgentsImpl52,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getAgent",
            handler:           fuck_getAgentImpl53,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createAgent",
            handler:           fuck_createAgentImpl54,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateAgent",
            handler:           fuck_updateAgentImpl55,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteAgent",
            handler:           fuck_deleteAgentImpl56,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "chatAgent",
            handler:           fuck_chatAgentImpl57,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getPublicConfigProfiles",
            handler:           fuck_getPublicConfigProfilesImpl58,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getConfigProfile",
            handler:           fuck_getConfigProfileImpl59,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createConfigProfile",
            handler:           fuck_createConfigProfileImpl60,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateConfigProfile",
            handler:           fuck_updateConfigProfileImpl61,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteConfigProfile",
            handler:           fuck_deleteConfigProfileImpl62,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getPublicInstructionSets",
            handler:           fuck_getPublicInstructionSetsImpl63,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getInstructionSet",
            handler:           fuck_getInstructionSetImpl64,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createInstructionSet",
            handler:           fuck_createInstructionSetImpl65,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateInstructionSet",
            handler:           fuck_updateInstructionSetImpl66,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteInstructionSet",
            handler:           fuck_deleteInstructionSetImpl67,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getModels",
            handler:           fuck_getModelsImpl68,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getModelsByProvider",
            handler:           fuck_getModelsByProviderImpl69,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getModel",
            handler:           fuck_getModelImpl70,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createModel",
            handler:           fuck_createModelImpl71,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateModel",
            handler:           fuck_updateModelImpl72,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteModel",
            handler:           fuck_deleteModelImpl73,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getVoiceProfiles",
            handler:           fuck_getVoiceProfilesImpl74,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getVoiceProfile",
            handler:           fuck_getVoiceProfileImpl75,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createVoiceProfile",
            handler:           fuck_createVoiceProfileImpl76,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateVoiceProfile",
            handler:           fuck_updateVoiceProfileImpl77,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteVoiceProfile",
            handler:           fuck_deleteVoiceProfileImpl78,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getSupervisor",
            handler:           openai_getSupervisorImpl79,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getMarketingAdvisor",
            handler:           openai_getMarketingAdvisorImpl80,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getProductivityCoach",
            handler:           openai_getProductivityCoachImpl81,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getTechAdvisor",
            handler:           openai_getTechAdvisorImpl82,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getHRConsultant",
            handler:           openai_getHRConsultantImpl83,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getFinancialAdvisor",
            handler:           openai_getFinancialAdvisorImpl84,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getProjectManager",
            handler:           openai_getProjectManagerImpl85,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getCommunicationCoach",
            handler:           openai_getCommunicationCoachImpl86,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getLegalAdvisor",
            handler:           openai_getLegalAdvisorImpl87,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getInnovationConsultant",
            handler:           openai_getInnovationConsultantImpl88,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getDataAnalyst",
            handler:           openai_getDataAnalystImpl89,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getWellnessCoach",
            handler:           openai_getWellnessCoachImpl90,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "openaiStream",
            handler:           openai_openaiStreamImpl91,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
];

registerGateways(gateways);
registerHandlers(handlers);

await run(import.meta.url);
