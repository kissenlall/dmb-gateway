export interface IPromotion {
  id?: number;
  name?: string;
}

export class Promotion implements IPromotion {
  constructor(public id?: number, public name?: string) {}
}
