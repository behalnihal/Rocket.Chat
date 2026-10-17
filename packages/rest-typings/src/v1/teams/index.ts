import type { IRoom, ITeam } from '@rocket.chat/core-typings';

import type { TeamsAddMembersProps } from './TeamsAddMembersProps';
import type { TeamsAddRoomsProps } from './TeamsAddRoomsProps';
import type { TeamsAutocompleteProps } from './TeamsAutocompleteProps';
import type { TeamsConvertToChannelProps } from './TeamsConvertToChannelProps';
import type { TeamsCreateProps } from './TeamsCreateProps';
import type { TeamsDeleteProps } from './TeamsDeleteProps';
import type { TeamsInfoProps } from './TeamsInfoProps';
import type { TeamsLeaveProps } from './TeamsLeaveProps';
import type { TeamsListChildrenProps } from './TeamsListChildren';
import type { TeamsListRoomsOfUserProps } from './TeamsListRoomsOfUserProps';
import type { TeamsListRoomsProps } from './TeamsListRoomsProps';
import type { TeamsMembersProps } from './TeamsMembersProps';
import type { TeamsRemoveMemberProps } from './TeamsRemoveMemberProps';
import type { TeamsRemoveRoomProps } from './TeamsRemoveRoomProps';
import type { TeamsUpdateMemberProps } from './TeamsUpdateMemberProps';
import type { TeamsUpdateProps } from './TeamsUpdateProps';
import type { TeamsUpdateRoomProps } from './TeamsUpdateRoomProps';

export * from './TeamsAddMembersProps';
export * from './TeamsAddRoomsProps';
export * from './TeamsAutocompleteProps';
export * from './TeamsConvertToChannelProps';
export * from './TeamsCreateProps';
export * from './TeamsDeleteProps';
export * from './TeamsInfoProps';
export * from './TeamsLeaveProps';
export * from './TeamsListChildren';
export * from './TeamsListRoomsOfUserProps';
export * from './TeamsListRoomsProps';
export * from './TeamsMembersProps';
export * from './TeamsRemoveMemberProps';
export * from './TeamsRemoveRoomProps';
export * from './TeamsUpdateMemberProps';
export * from './TeamsUpdateProps';
export * from './TeamsUpdateRoomProps';

type ITeamAutocompleteResult = Pick<IRoom, '_id' | 'fname' | 'teamId' | 'name' | 't' | 'avatarETag'>;

type TeamProps =
	| TeamsRemoveRoomProps
	| TeamsConvertToChannelProps
	| TeamsUpdateMemberProps
	| TeamsAddMembersProps
	| TeamsRemoveMemberProps
	| TeamsDeleteProps
	| TeamsLeaveProps
	| TeamsUpdateProps;

export const isTeamPropsWithTeamName = <T extends TeamProps>(props: T): props is T & { teamName: string } => 'teamName' in props;

export const isTeamPropsWithTeamId = <T extends TeamProps>(props: T): props is T & { teamId: string } => 'teamId' in props;

// Public mirror of the implementation-derived routes (apps/meteor/server/api/v1/teams.ts,
// `ExtractRoutesFromAPI<typeof teamsEndpoints>` plus the standalone `API.v1` route registrations).
// Kept identical to the impl generics so the two declarations merge without TS2320, and so
// SDK/external consumers that don't compile apps/meteor keep every teams route.
export type TeamsEndpoints = {
	'/v1/teams.list': {
		GET: (params?: never) => { teams: ITeam[]; total: number; count: number; offset: number };
	};
	'/v1/teams.listAll': {
		GET: (params?: never) => { teams: ITeam[]; total: number; count: number; offset: number };
	};
	'/v1/teams.create': {
		POST: (params: TeamsCreateProps) => { team: ITeam };
	};
	'/v1/teams.convertToChannel': {
		POST: (params: TeamsConvertToChannelProps) => void;
	};
	'/v1/teams.addRooms': {
		POST: (params: TeamsAddRoomsProps) => { rooms: object[] };
	};
	'/v1/teams.removeRoom': {
		POST: (params: TeamsRemoveRoomProps) => { room: object };
	};
	'/v1/teams.updateRoom': {
		POST: (params: TeamsUpdateRoomProps) => { room: object };
	};
	'/v1/teams.listRooms': {
		GET: (params: TeamsListRoomsProps) => { rooms: object[]; total: number; count: number; offset: number };
	};
	'/v1/teams.listRoomsOfUser': {
		GET: (params: TeamsListRoomsOfUserProps) => { rooms: object[]; total: number; count: number; offset: number };
	};
	'/v1/teams.listChildren': {
		GET: (params: TeamsListChildrenProps) => { data: object[]; total: number; offset: number; count: number };
	};
	'/v1/teams.members': {
		GET: (params: TeamsMembersProps) => { members: object[]; total: number; count: number; offset: number };
	};
	'/v1/teams.addMembers': {
		POST: (params: TeamsAddMembersProps) => void;
	};
	'/v1/teams.updateMember': {
		POST: (params: TeamsUpdateMemberProps) => void;
	};
	'/v1/teams.removeMember': {
		POST: (params: TeamsRemoveMemberProps) => void;
	};
	'/v1/teams.leave': {
		POST: (params: TeamsLeaveProps) => void;
	};
	'/v1/teams.info': {
		GET: (params: TeamsInfoProps) => { teamInfo: ITeam };
	};
	'/v1/teams.delete': {
		POST: (params: TeamsDeleteProps) => void;
	};
	'/v1/teams.autocomplete': {
		GET: (params: TeamsAutocompleteProps) => { teams: ITeamAutocompleteResult[] };
	};
	'/v1/teams.update': {
		POST: (params: TeamsUpdateProps) => void;
	};
};
