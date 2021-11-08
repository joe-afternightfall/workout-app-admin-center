import { CircuitTemplateDAO, SetTemplate } from './CircuitTemplateDAO';

export class CircuitTemplateVO extends CircuitTemplateDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    circuitId: string,
    circuitNickname: string,
    exercises: SetTemplate[]
  ) {
    super(id, circuitId, circuitNickname, exercises);
    this.firebaseId = firebaseId;
  }
}
