export class Arrival {
  constructor(public time: Date, public stopId: number) {

  }
}

export class Trip {
  public stops: Arrival[];

  constructor(stops: any[]) {
    this.stops = stops;
  }
}
