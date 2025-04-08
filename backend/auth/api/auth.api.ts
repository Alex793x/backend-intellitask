import { api } from 'encore.dev/api';
import { getAuthData } from '~encore/auth';
import { toNodeHandler } from 'better-auth/node';
import { auth, AuthData } from '../auth';

export const authRouter = api.raw(
  {
    expose: true,
    path: '/api/auth/*params',
    method: '*',
  },
  async (req, res) => {
    const authRouter = toNodeHandler(auth);
    authRouter(req, res)
      .then((result) => {
        res.end(result);
      })
      .catch((error) => {
        console.error(error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
  }
);

export const handler = api<void, AuthData>(
  { expose: true, path: '/api/authorize', auth: true, method: 'GET' },
  async (): Promise<AuthData> => {
    const { session, user, userID } = getAuthData()!;

    return {
      session,
      user,
      userID,
    };
  }
);
