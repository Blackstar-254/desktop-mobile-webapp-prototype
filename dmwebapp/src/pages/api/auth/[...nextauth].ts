import NextAuth from 'next-auth';

import { authOptions } from '@blackstar/server/auth';

export default NextAuth(authOptions);
