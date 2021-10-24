import { ActionTypes } from './actions';

export interface ValidatedUserAction {
  type: ActionTypes.VALIDATED_USER;
  email: string;
}

export const validatedUser = (email: string): ValidatedUserAction => {
  return {
    type: ActionTypes.VALIDATED_USER,
    email: email,
  };
};
