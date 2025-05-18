export function calculateDistance(list1: number[], list2: number[]): number {
  const sortedList1 = [...list1].sort((a, b) => a - b);
  const sortedList2 = [...list2].sort((a, b) => a - b);

  return sortedList1.reduce((total, num, index) => {
    return total + Math.abs(num - sortedList2[index]);
  }, 0);
}
