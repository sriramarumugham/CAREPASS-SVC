import { Static, Type } from '@sinclair/typebox';

export enum ERequestTypes {
  ACTIVATE = 'ACTIVATE',
  DEACTIVATE = 'DEACTIVATE',
  REACTIVATE = 'REACTIVATE',
}

export enum ERequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const clientStatusChangeReqSchema = Type.Object({
  requestId: Type.String(),
  clientId: Type.String(),
  requestType: Type.Enum(ERequestTypes),
  note: Type.Optional(Type.String()),
  status: Type.Enum(ERequestStatus),
});
export const addStatusRequestSchema = Type.Pick(clientStatusChangeReqSchema, [
  'clientId',
  'requestType',
  'note',
]);

export type AddClientStatusChangeRequestType = Static<
  typeof addStatusRequestSchema
>;

export type ClientStatusChangeReqType = Static<
  typeof clientStatusChangeReqSchema
>;
