export class Stop {
  constructor(public time: Date, public stopId: number) {

  }
}

export class Trip {
  public stops: Stop[];

  constructor(stops: any[]) {
    this.stops = stops;
  }
}
