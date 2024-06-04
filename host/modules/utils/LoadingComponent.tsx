import {
  type ComponentProps,
  type FC,
  type FunctionComponent,
  type LazyExoticComponent,
  type PropsWithChildren,
  Suspense,
} from 'react';

// HOC for react lazy importing
export const withSuspense = <T extends FunctionComponent<any>>(
  Component: LazyExoticComponent<T>
): FC<PropsWithChildren<ComponentProps<T>>> => {
  const WrappedComponent: FC<PropsWithChildren<ComponentProps<T>>> = (
    props
  ) => (
    <Suspense fallback={<h3>...Loading</h3>}>
      <Component {...(props as ComponentProps<T>)} />
    </Suspense>
  );

  return WrappedComponent;
};
