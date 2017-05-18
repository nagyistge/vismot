// Purple Line (starting at east terminus)
export const STOPS: any[] = [
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

export const NETWORK: any[] = [
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

// Westbound Purple (Fri/Sat night)
export const SCHEDULE_TITLE: string = 'Purple - Westbound (Friday & Saturday late night)';
export const PURPLE_LINE: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
export const STOP_TIMES: string[][] = [
  [
    '12:31',
    '12:33',
    '12:34',
    '12:36',
    '12:38',
    '12:40',
    '12:42',
    '12:44'
  ],
  [
    '12:51',
    '12:53',
    '12:54',
    '12:56',
    '12:58',
    '1:00',
    '1:02',
    '1:04'
  ],
  [
    '1:11',
    '1:13',
    '1:14',
    '1:16',
    '1:18',
    '1:20',
    '1:22',
    '1:24'
  ],
  [
    '1:31',
    '1:33',
    '1:34',
    '1:36',
    '1:38',
    '1:40',
    '1:42',
    '1:44'
  ],
  [
    '1:51',
    '1:53',
    '1:54',
    '1:56',
    '1:58',
    '2:00',
    '2:02',
    '2:04'
  ],
  [
    '2:11',
    '2:13',
    '2:14',
    '2:16',
    '2:18',
    '2:20',
    '2:22',
    '2:24'
  ]
];
