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
