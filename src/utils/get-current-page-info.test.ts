import { getPageInfo } from './get-current-page-info';
import { appNavigationRoutes } from '../configs/constants/app-navigation-routes';

describe('Get Current Page Info util', () => {
  it('should return route prop object', () => {
    const pageInfo = getPageInfo('/dashboard');

    expect(pageInfo).toBe(appNavigationRoutes.DASHBOARD);
  });
});
