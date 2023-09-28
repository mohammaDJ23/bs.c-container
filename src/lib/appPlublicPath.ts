import { isProduction } from './environments';

export const appPublicPath = isProduction() ? '/container/static/' : '/';
