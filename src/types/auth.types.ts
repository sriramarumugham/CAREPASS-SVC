import { Static, Type } from '@sinclair/typebox';

const verifyAuthTokenRequest = Type.Object({
  token: Type.String(),
});

type VerifyAuthTokenResponse = {
  message: string;
  code: number;
  userId?: string;
};

type VerifyAuthTokenRequest = Static<typeof verifyAuthTokenRequest>;

export {
  VerifyAuthTokenResponse,
  VerifyAuthTokenRequest,
  verifyAuthTokenRequest,
};
