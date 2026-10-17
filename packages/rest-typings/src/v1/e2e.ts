import type { IRoom, ISubscription, IUser } from '@rocket.chat/core-typings';

import { ajv } from './Ajv';

type E2eSetUserPublicAndPrivateKeysProps = {
	public_key: string;
	private_key: string;
	force?: boolean;
};

const E2eSetUserPublicAndPrivateKeysSchema = {
	type: 'object',
	properties: {
		public_key: {
			type: 'string',
		},
		private_key: {
			type: 'string',
		},
	},
	required: ['public_key', 'private_key'],
	additionalProperties: false,
};

export const isE2eSetUserPublicAndPrivateKeysProps = ajv.compile<E2eSetUserPublicAndPrivateKeysProps>(E2eSetUserPublicAndPrivateKeysSchema);

// Public mirror of the implementation-derived routes (apps/meteor/server/api/v1/e2e.ts,
// `ExtractRoutesFromAPI<typeof e2eEndpoints>`). Kept identical so the two declarations merge
// without TS2320, and so SDK/external consumers that don't compile apps/meteor keep these routes.
export type E2eEndpoints = {
	'/v1/e2e.setRoomKeyID': {
		POST: (params: { rid: string; keyID: string }) => void;
	};
	'/v1/e2e.requestSubscriptionKeys': {
		POST: (params?: never) => void;
	};
	'/v1/e2e.fetchMyKeys': {
		GET: (params?: never) => { public_key?: string; private_key?: string };
	};
	'/v1/e2e.getUsersOfRoomWithoutKey': {
		GET: (params: { rid: string }) => { users: Pick<IUser, '_id' | 'e2e'>[] };
	};
	'/v1/e2e.rejectSuggestedGroupKey': {
		POST: (params: { rid: string }) => void;
	};
	'/v1/e2e.acceptSuggestedGroupKey': {
		POST: (params: { rid: string }) => void;
	};
	'/v1/e2e.fetchUsersWaitingForGroupKey': {
		GET: (params: { roomIds: string[] }) => {
			usersWaitingForE2EKeys: Record<IRoom['_id'], { _id: IUser['_id']; public_key: string }[]>;
		};
	};
	'/v1/e2e.updateGroupKey': {
		POST: (params: { uid: string; rid: string; key: string }) => void;
	};
	'/v1/e2e.provideUsersSuggestedGroupKeys': {
		POST: (params: {
			usersSuggestedGroupKeys: Record<IRoom['_id'], { _id: IUser['_id']; key: string; oldKeys: ISubscription['suggestedOldRoomKeys'] }[]>;
		}) => void;
	};
	'/v1/e2e.resetRoomKey': {
		POST: (params: { rid: string; e2eKey: string; e2eKeyId: string }) => void;
	};
	'/v1/e2e.setUserPublicAndPrivateKeys': {
		POST: (params: E2eSetUserPublicAndPrivateKeysProps) => void;
	};
};
