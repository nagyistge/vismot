// Import models
import { Arrival, Trip } from './trip.model';
import { Route } from './route.model';

/*
DATA TYPES
###############################
stops:
  [
    {
      name: <string>,
      id: <integer>,
      color: <string>
    },
    ...
  ]

nodes:
  [
    {
      stopId:   <integer>,
      x:        <integer>,
      y:        <integer>,
      children: <integer[]>
    },
    ...
  ]

lineSequence:
  [
    <integer>,
    ...
  ]

stopTimes:
  [
    {
      stopId: <integer>,
      time:   <string>
    },
    ...
  ]
*/


// Purple & Red Line stops (starting at east terminus)
export const STOPS: any[] = [   // type:  stops
  { name: 'Union Station', id:  1, color: 'black' },
  { name: 'Civic Center/Grand Park', id: 2, color: 'black' },
  { name: 'Pershing Square', id: 3, color: 'black' },
  { name: '7th St/Metro Center', id: 4, color: 'black' },
  { name: 'Westlake/MacArthur Park', id: 5, color: 'black' },
  { name: 'Wilshire/Vermont', id: 6, color: 'black' },
  { name: 'Wilshire/Normandie', id: 7, color: 'purple' },
  { name: 'Wilshire/Western', id: 8, color: 'purple' },
  { name: 'Vermont/Beverly', id: 9, color: 'red' },
  { name: 'Vermont/Santa Monica', id: 10, color: 'red' },
  { name: 'Vermont/Sunset', id: 11, color: 'red' },
  { name: 'Hollywood/Western', id: 12, color: 'red' },
  { name: 'Hollywood/Vine', id: 13, color: 'red' },
  { name: 'Hollywood/Highland', id: 14, color: 'red' },
  { name: 'Universal/Studio City', id: 15, color: 'red' },
  { name: 'North Hollywood', id: 16, color: 'red' }
];

export const NETWORK: any[] = [ // type: nodes
  {
    stopId: 1,
    x: 8,
    y: 1,
    children: [2]
  },
  {
    stopId: 2,
    x: 7,
    y: 1,
    children: [3]
  },
  {
    stopId: 3,
    x: 6,
    y: 1,
    children: [4]
  },
  {
    stopId: 4,
    x: 5,
    y: 1,
    children: [5]
  },
  {
    stopId: 5,
    x: 4,
    y: 1,
    children: [6]
  },
  {
    stopId: 6,
    x: 3,
    y: 1,
    children: [7, 9]
  },
  {
    stopId: 7,
    x: 2,
    y: 1,
    children: [8]
  },
  {
    stopId: 8,
    x: 1,
    y: 1,
    children: []
  },
  {
    stopId: 9,
    x: 3,
    y: 2,
    children: [10]
  },
  {
    stopId: 10,
    x: 3,
    y: 3,
    children: [11]
  },
  {
    stopId: 11,
    x: 3,
    y: 4,
    children: [12]
  },
  {
    stopId: 12,
    x: 3,
    y: 5,
    children: [13]
  },
  {
    stopId: 13,
    x: 3,
    y: 6,
    children: [14]
  },
  {
    stopId: 14,
    x: 3,
    y: 7,
    children: [15]
  },
  {
    stopId: 15,
    x: 3,
    y: 8,
    children: [16]
  },
  {
    stopId: 16,
    x: 3,
    y: 9,
    children: []
  }
];

export const PURPLE_WESTBOUND_SEQUENCE: number[] = [1, 2, 3, 4, 5, 6, 7, 8];  // type: lineSequence
export const PURPLE_EASTBOUND_SEQUENCE: number[] = [8, 7, 6, 5, 4, 3, 2, 1];
export const RED_WESTBOUND_SEQUENCE: number[] = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16];

export const PURPLE_WESTBOUND_LATE: any[][] = [ // type: stopTimes
  [
    { stopId: 1, time: '00:31' },
    { stopId: 2, time: '00:33' },
    { stopId: 3, time: '00:34' },
    { stopId: 4, time: '00:36' },
    { stopId: 5, time: '00:38' },
    { stopId: 6, time: '00:40' },
    { stopId: 7, time: '00:42' },
    { stopId: 8, time: '00:44' }
  ],
  [
    { stopId: 1, time: '00:51' },
    { stopId: 2, time: '00:53' },
    { stopId: 3, time: '00:54' },
    { stopId: 4, time: '00:56' },
    { stopId: 5, time: '00:58' },
    { stopId: 6, time: '1:00' },
    { stopId: 7, time: '1:02' },
    { stopId: 8, time: '1:04' }
  ],
  [
    { stopId: 1, time: '1:11' },
    { stopId: 2, time: '1:13' },
    { stopId: 3, time: '1:14' },
    { stopId: 4, time: '1:16' },
    { stopId: 5, time: '1:18' },
    { stopId: 6, time: '1:20' },
    { stopId: 7, time: '1:22' },
    { stopId: 8, time: '1:24' }
  ],
  [
    { stopId: 1, time: '1:31' },
    { stopId: 2, time: '1:33' },
    { stopId: 3, time: '1:34' },
    { stopId: 4, time: '1:36' },
    { stopId: 5, time: '1:38' },
    { stopId: 6, time: '1:40' },
    { stopId: 7, time: '1:42' },
    { stopId: 8, time: '1:44' }
  ],
  [
    { stopId: 1, time: '1:51' },
    { stopId: 2, time: '1:53' },
    { stopId: 3, time: '1:54' },
    { stopId: 4, time: '1:56' },
    { stopId: 5, time: '1:58' },
    { stopId: 6, time: '2:00' },
    { stopId: 7, time: '2:02' },
    { stopId: 8, time: '2:04' }
  ],
  [
    { stopId: 1, time: '2:11' },
    { stopId: 2, time: '2:13' },
    { stopId: 3, time: '2:14' },
    { stopId: 4, time: '2:16' },
    { stopId: 5, time: '2:18' },
    { stopId: 6, time: '2:20' },
    { stopId: 7, time: '2:22' },
    { stopId: 8, time: '2:24' }
  ]
];

export const PURPLE_EASTBOUND_LATE: any[][] = [
  [
    { stopId: 8, time: '00:48' },
    { stopId: 7, time: '00:50' },
    { stopId: 6, time: '00:52' },
    { stopId: 5, time: '00:54' },
    { stopId: 4, time: '00:56' },
    { stopId: 3, time: '00:57' },
    { stopId: 2, time: '00:58' },
    { stopId: 1, time: '01:01' }
  ],
  [
    { stopId: 8, time: '01:08' },
    { stopId: 7, time: '01:10' },
    { stopId: 6, time: '01:12' },
    { stopId: 5, time: '01:14' },
    { stopId: 4, time: '01:16' },
    { stopId: 3, time: '01:17' },
    { stopId: 2, time: '01:18' },
    { stopId: 1, time: '01:21' }
  ],
  [
    { stopId: 8, time: '01:28' },
    { stopId: 7, time: '01:30' },
    { stopId: 6, time: '01:32' },
    { stopId: 5, time: '01:34' },
    { stopId: 4, time: '01:36' },
    { stopId: 3, time: '01:37' },
    { stopId: 2, time: '01:38' },
    { stopId: 1, time: '01:41' }
  ],
  [
    { stopId: 8, time: '01:48' },
    { stopId: 7, time: '01:50' },
    { stopId: 6, time: '01:52' },
    { stopId: 5, time: '01:54' },
    { stopId: 4, time: '01:56' },
    { stopId: 3, time: '01:57' },
    { stopId: 2, time: '01:58' },
    { stopId: 1, time: '02:01' }
  ],
  [
    { stopId: 8, time: '02:08' },
    { stopId: 7, time: '02:10' },
    { stopId: 6, time: '02:12' },
    { stopId: 5, time: '02:14' },
    { stopId: 4, time: '02:16' },
    { stopId: 3, time: '02:17' },
    { stopId: 2, time: '02:18' },
    { stopId: 1, time: '02:21' }
  ]
];

export const RED_WESTBOUND_LATE: any[][] = [
  [
    { stopId: 1, time: '00:41' },
    { stopId: 2, time: '00:43' },
    { stopId: 3, time: '00:44' },
    { stopId: 4, time: '00:46' },
    { stopId: 5, time: '00:48' },
    { stopId: 6, time: '00:50' },
    { stopId: 9, time: '00:52' },
    { stopId: 10, time: '00:54' },
    { stopId: 11, time: '00:55' },
    { stopId: 12, time: '00:57' },
    { stopId: 13, time: '01:00' },
    { stopId: 14, time: '01:02' },
    { stopId: 15, time: '01:06' },
    { stopId: 16, time: '01:10' }
  ],
  [
    { stopId: 1, time: '01:01' },
    { stopId: 2, time: '01:03' },
    { stopId: 3, time: '01:04' },
    { stopId: 4, time: '01:06' },
    { stopId: 5, time: '01:08' },
    { stopId: 6, time: '01:10' },
    { stopId: 9, time: '01:12' },
    { stopId: 10, time: '01:14' },
    { stopId: 11, time: '01:15' },
    { stopId: 12, time: '01:17' },
    { stopId: 13, time: '01:20' },
    { stopId: 14, time: '01:22' },
    { stopId: 15, time: '01:26' },
    { stopId: 16, time: '01:30' }
  ]
  ,
  [
    { stopId: 1, time: '01:21' },
    { stopId: 2, time: '01:23' },
    { stopId: 3, time: '01:24' },
    { stopId: 4, time: '01:26' },
    { stopId: 5, time: '01:28' },
    { stopId: 6, time: '01:30' },
    { stopId: 9, time: '01:32' },
    { stopId: 10, time: '01:34' },
    { stopId: 11, time: '01:35' },
    { stopId: 12, time: '01:37' },
    { stopId: 13, time: '01:40' },
    { stopId: 14, time: '01:42' },
    { stopId: 15, time: '01:46' },
    { stopId: 16, time: '01:50' }
  ],
  [
    { stopId: 1, time: '01:41' },
    { stopId: 2, time: '01:43' },
    { stopId: 3, time: '01:44' },
    { stopId: 4, time: '01:46' },
    { stopId: 5, time: '01:48' },
    { stopId: 6, time: '01:50' },
    { stopId: 9, time: '01:52' },
    { stopId: 10, time: '01:54' },
    { stopId: 11, time: '01:55' },
    { stopId: 12, time: '01:57' },
    { stopId: 13, time: '02:00' },
    { stopId: 14, time: '02:02' },
    { stopId: 15, time: '02:06' },
    { stopId: 16, time: '02:10' }
  ],
  [
    { stopId: 1, time: '02:01' },
    { stopId: 2, time: '02:03' },
    { stopId: 3, time: '02:04' },
    { stopId: 4, time: '02:06' },
    { stopId: 5, time: '02:08' },
    { stopId: 6, time: '02:10' },
    { stopId: 9, time: '02:12' },
    { stopId: 10, time: '02:14' },
    { stopId: 11, time: '02:15' },
    { stopId: 12, time: '02:17' },
    { stopId: 13, time: '02:20' },
    { stopId: 14, time: '02:22' },
    { stopId: 15, time: '02:26' },
    { stopId: 16, time: '02:30' }
  ],
  [
    { stopId: 1, time: '02:21' },
    { stopId: 2, time: '02:23' },
    { stopId: 3, time: '02:24' },
    { stopId: 4, time: '02:26' },
    { stopId: 5, time: '02:28' },
    { stopId: 6, time: '02:30' },
    { stopId: 9, time: '02:32' },
    { stopId: 10, time: '02:34' },
    { stopId: 11, time: '02:35' },
    { stopId: 12, time: '02:37' },
    { stopId: 13, time: '02:40' },
    { stopId: 14, time: '02:42' },
    { stopId: 15, time: '02:46' },
    { stopId: 16, time: '02:50' }
  ]
];


export const PURPLE_WESTBOUND_LATE_ROUTE: Route = new Route(PURPLE_WESTBOUND_SEQUENCE, createTrips(PURPLE_WESTBOUND_LATE), 'purple', 'westbound', 'Friday & Saturday late night');
export const PURPLE_EASTBOUND_LATE_ROUTE: Route = new Route(PURPLE_EASTBOUND_SEQUENCE, createTrips(PURPLE_EASTBOUND_LATE), 'purple', 'eastbound', 'Friday & Saturday late night');
export const RED_WESTBOUND_LATE_ROUTE: Route = new Route(RED_WESTBOUND_SEQUENCE, createTrips(RED_WESTBOUND_LATE), 'red', 'westbound', 'Friday & Saturday late night');

function createTrips(stopTimes): Trip[] {
  let trips: Trip[];
  trips = stopTimes.map(function(trip) {
    let arrivals: Arrival[] = trip.map(function(stopTime) {
      return new Arrival(parseTime(stopTime.time), stopTime.stopId);
    });
    return new Trip(arrivals);
  });

  return trips;
}


function parseTime(timeString: string) {
  let hours: number;
  let minutes: number;

  let re = /([0-9]+):([0-9]+)/;
  let match = re.exec(timeString);
  hours = parseInt(match[1]);
  minutes = parseInt(match[2]);

  return new Date(2000, 0, 1, hours, minutes);
}
