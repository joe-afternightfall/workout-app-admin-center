import { LocationChangeAction } from 'connected-react-router';
import { ValidatedUserAction } from './user-info';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  VALIDATED_USER = 'VALIDATED_USER',
}

export type ApplicationActions = LocationChangeAction | ValidatedUserAction;
