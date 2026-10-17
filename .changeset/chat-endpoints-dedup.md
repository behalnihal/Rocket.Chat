---
'@rocket.chat/rest-typings': patch
'@rocket.chat/ddp-client': patch
'@rocket.chat/fuselage-ui-kit': patch
'@rocket.chat/meteor': patch
---

Reconciles REST route type declarations for TypeScript 7. Each migrated route is declared twice — hand-written in `@rocket.chat/rest-typings` and derived from the implementation via `ExtractRoutesFromAPI` — and the two had drifted, which TS7 rejects (TS2320) when merging them into `Endpoints`. Rather than deleting the hand-written side (which would drop those routes from the published type for SDK and external consumers that don't compile `apps/meteor`), the hand-written declarations are kept and made identical to the implementation-derived types, so the published contract stays complete. Where the extracted type was weaker than the real response, the route's own `ajv.compile` generic was strengthened at the source (e.g. `chat.getURLPreview`, `im.history`, `teams.*` rooms/members, `roles.sync`) so both the published contract and the impl stay rich and accurate — no loosening to `object`/`any`. Previously inaccurate public claims were corrected to the truthful type (`chat.postMessage` `channel: string`, `chat.getDeletedMessages` returns only `_id`s, `roles.list` has no `_updatedAt`, `teams.create` `type: 0 | 1`). Any future drift re-triggers TS2320, keeping the two declarations in sync with no new tooling. Covers chat, dm/im, e2e, emoji-custom, invites, push, roles, rooms, teams, and one omnichannel route; routes still on the legacy `API.v1.addRoute` keep their standalone rest-typings declarations until migrated.
