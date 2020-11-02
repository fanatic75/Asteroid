export interface AsteroidI {
  id: number;
  name: string;
  close_approach_data: [
    {
      close_approach_date: string;
      relative_velocity: {
        kilometers_per_second: string;
      },
      miss_distance: {
        astronomical: string;
        kilometers: string;
        lunar: string;
      },
    }
  ];
}
