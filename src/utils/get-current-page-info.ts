import {
  PageProps,
  RouteProp,
  appNavigationRoutes,
} from '../configs/constants/app-navigation-routes';

export const getPageInfo = (location: string): RouteProp | undefined => {
  const found = Object.keys(appNavigationRoutes).find((route) => {
    if (
      appNavigationRoutes[route].pageProps.map(
        (page: PageProps) => page.path === location
      )
    ) {
      return appNavigationRoutes[route];
    }
  });

  if (found !== undefined) {
    return appNavigationRoutes[found];
  }
};
