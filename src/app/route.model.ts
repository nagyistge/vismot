import { Trip } from './trip.model';

export class Route {
  constructor(
    public stopSequence,
    public trips: Trip[],
    public colorName: string,
    public directionName: string,
    public scheduleName: string
  ) { }
}
