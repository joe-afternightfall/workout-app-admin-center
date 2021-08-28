import { getPageInfo } from './get-current-page-info';
import { routes } from '../configs/constants/routes';

describe('Get Current Page Info util', () => {
  it('should return route prop object', () => {
    const pageInfo = getPageInfo('/dashboard');

    expect(pageInfo).toBe(routes.DASHBOARD);
  });
});
