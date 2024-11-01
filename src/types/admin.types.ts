import { AutoloadPluginOptions } from '@fastify/autoload';
import { Static, Type } from '@sinclair/typebox';

export enum AdminStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export enum AdminRole {
  ADMIN = 'ADMIN',
}

export const AdminType = Type.Object({
  fullName: Type.String(),
  email: Type.String({ format: 'email' }),
  phoneNumber: Type.String(),
  status: Type.Enum(AdminStatus),
  createdAt: Type.Any(),
  updatedAt: Type.Any(),
  password: Type.String(),
  role: Type.Enum(AdminRole), // New field for role
});

export type AdminDocument = Static<typeof AdminType>;
