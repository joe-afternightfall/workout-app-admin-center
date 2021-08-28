import { validatedUser } from './user-info';
import { chance } from 'jest-chance';
import { ActionTypes } from './actions';

describe('user-info creator methods', () => {
  it('should return validated user action', () => {
    const email = chance.string();
    const action = validatedUser(email);

    expect(action).toEqual({
      type: ActionTypes.VALIDATED_USER,
      email: email,
    });
  });
});
