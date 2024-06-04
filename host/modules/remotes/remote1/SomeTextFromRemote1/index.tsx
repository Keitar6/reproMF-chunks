import { lazy } from 'react';
import { withSuspense } from '@/modules/utils/LoadingComponent';

export const SomeTextFromRemote1 = lazy(
  () => import('remote1/SomeTextFromRemote1')
);

export default withSuspense(SomeTextFromRemote1);
