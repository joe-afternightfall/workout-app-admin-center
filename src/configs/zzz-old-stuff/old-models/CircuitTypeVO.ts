import { CircuitTypeDAO } from './CircuitTypeDAO';

export class CircuitTypeVO extends CircuitTypeDAO {
  firebaseId: string;

  constructor(firebaseId: string, id: string, name: string) {
    super(id, name);
    this.firebaseId = firebaseId;
  }
}
