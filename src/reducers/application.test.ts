import { chance } from 'jest-chance';
import application from './application';
import { ActionTypes } from '../creators/actions';
import { getPageInfo } from '../utils/get-current-page-info';
import { DashboardRounded as DashboardIcon } from '@material-ui/icons';
import DashboardScreen from '../components/top-level-components/dashboard-screen/DashboardScreen';

jest.mock('../utils/get-current-page-info');

const mockGetPageInfo = getPageInfo as jest.Mock;

describe('Application Reducer', () => {
  it('should update current location', () => {
    const mockPage = {
      nested: false,
      mainTitle: chance.string(),
      mainIcon: DashboardIcon,
      pageProps: {
        path: chance.string(),
        drawerTitle: chance.string(),
        headerTitle: chance.string(),
        icon: DashboardIcon,
        testId: chance.string(),
        routerComponent: DashboardScreen,
      },
    };
    mockGetPageInfo.mockReturnValue(mockPage);

    const state = application.reducer(undefined, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/testing-pathname',
          search: '',
          key: '',
          hash: '',
          query: {
            test: 'test',
          },
          state: '',
        },
        action: 'PUSH',
        isFirstRendering: false,
      },
    });

    expect(state.currentLocation).toBe('/testing-pathname');
    expect(state.activePage).toBe(mockPage);
  });

  it('should return validated user action', () => {
    const email = chance.string();
    const state = application.reducer(undefined, {
      type: ActionTypes.VALIDATED_USER,
      email: email,
    });

    expect(state.userEmail).toBe(email);
  });

  it('should return logout user action', () => {
    const state = application.reducer(undefined, {
      type: ActionTypes.LOGOUT_USER,
    });

    expect(state.userIsValidated).toBe(false);
  });
});
