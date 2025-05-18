export interface RecentFile {
  name: string;
  date: string;
  stats: {
    list1Count: number;
    list2Count: number;
    distance: number;
  };
}
