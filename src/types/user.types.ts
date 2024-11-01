import { Static, Type } from '@sinclair/typebox';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
const UserSchema = Type.Object({
  userId: Type.String(),
  fullName: Type.String(),
  email: Type.String(),
  phoneNumber: Type.Optional(Type.String()),
  createdAt: Type.String({ format: 'date-time' }),
  modifiedAt: Type.String({ format: 'date-time' }),
  status: Type.Enum(UserStatus),
  annualIncome: Type.Optional(Type.String()), // Optional
  area: Type.Optional(Type.String()), // Optional
  pin: Type.Optional(Type.String()),
  city: Type.Optional(Type.String()), // Optional
  dateOfBirth: Type.Optional(Type.String()), // Optional
  gender: Type.Optional(Type.Enum(GENDER)), // Optional with specific values
  isSalaried: Type.Optional(Type.Boolean()), // Optional
  smoking: Type.Optional(Type.Boolean()), // Optional
});

const CreateUserBodySchema = Type.Pick(UserSchema, [
  'fullName',
  'email',
  'phoneNumber',
]);

type CreateUserBodyDocument = Static<typeof CreateUserBodySchema>;

const UpdateUserBodySchema = Type.Pick(UserSchema, [
  'fullName',
  'email',
  'phoneNumber',
  'annualIncome',
  'area',
  'city',
  'dateOfBirth',
  'gender',
  'isSalaried',
  'smoking',
  'pin',
]);

type UpdateUserBodyDocument = Static<typeof UpdateUserBodySchema>;

type UserDocument = Static<typeof UserSchema>;

export {
  UserSchema,
  UserDocument,
  CreateUserBodyDocument,
  CreateUserBodySchema,
  UpdateUserBodySchema,
  UpdateUserBodyDocument,
};
