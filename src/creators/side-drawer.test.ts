import {
  closeSideDrawer,
  logoutUser,
  openSideDrawer,
  setDrawerSize,
  userClickedCloseDrawer,
  userClickedOpenDrawer,
} from './side-drawer';
import { ActionTypes } from './actions';
import { chance } from 'jest-chance';

describe('side-drawer creator methods', () => {
  it('should return close side drawer action', () => {
    const action = closeSideDrawer();

    expect(action).toEqual({
      type: ActionTypes.CLOSE_TEMP_SIDE_DRAWER,
    });
  });

  it('should return open side drawer action', () => {
    const action = openSideDrawer();

    expect(action).toEqual({
      type: ActionTypes.OPEN_TEMP_SIDE_DRAWER,
    });
  });

  it('should return set drawer size action', () => {
    const size = chance.string();
    const action = setDrawerSize(size);

    expect(action).toEqual({
      type: ActionTypes.SET_DRAWER_SIZE,
      size: size,
    });
  });

  it('should return user clicked close action', () => {
    const action = userClickedCloseDrawer();

    expect(action).toEqual({
      type: ActionTypes.USER_CLICKED_CLOSE_DRAWER,
    });
  });

  it('should return user clicked open action', () => {
    const action = userClickedOpenDrawer();

    expect(action).toEqual({
      type: ActionTypes.USER_CLICKED_OPEN_DRAWER,
    });
  });

  it('should return logout user action', () => {
    const action = logoutUser();

    expect(action).toEqual({
      type: ActionTypes.LOGOUT_USER,
    });
  });
});
