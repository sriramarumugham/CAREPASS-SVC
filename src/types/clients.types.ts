import { Static, Type } from '@sinclair/typebox';

const AddSpocTypesSchema = Type.Object({
  spocName: Type.String(),
  spocEmail: Type.String(),
  spocMobileNumber: Type.String(),
  spocType: Type.String(),
});

const UpdateSpocTypesSchema = Type.Object({
  spocName: Type.Optional(Type.String()),
  spocEmail: Type.Optional(Type.String()),
  spocMobileNumber: Type.Optional(Type.String()),
  spocType: Type.Optional(Type.String()),
  spocId: Type.Optional(Type.String()),
});

export enum EClientStatus {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'DEACTIVATED' = 'DEACTIVATED',
}

interface CreateSpocRequest extends Static<typeof AddSpocTypesSchema> {}
interface UpdateSpocRequest extends Static<typeof UpdateSpocTypesSchema> {}

export {
  AddSpocTypesSchema,
  UpdateSpocTypesSchema,
  CreateSpocRequest,
  UpdateSpocRequest,
};
