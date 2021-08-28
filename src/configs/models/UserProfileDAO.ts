export interface UserWeight {
  id: string;
  weight: string;
  lastUpdatedOn: string;
}

export interface UserHeight {
  feet: string;
  inches: string;
}

export class UserProfileDAO {
  id: string;
  email: string;
  displayName: string;
  profileIcon: string;
  height: UserHeight;
  weights: UserWeight[];
  dateOfBirth: string;
  lastUpdatedOn: string;

  constructor(
    id: string,
    email: string,
    profileIcon: string,
    displayName: string,
    height: UserHeight,
    weights: UserWeight[],
    dateOfBirth: string,
    lastUpdatedOn: string
  ) {
    this.id = id;
    this.email = email;
    this.profileIcon = profileIcon;
    this.displayName = displayName;
    this.weights = weights;
    this.height = height;
    this.dateOfBirth = dateOfBirth;
    this.lastUpdatedOn = lastUpdatedOn;
  }
}
