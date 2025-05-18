/**
 * Calculates the total distance between two lists of numbers.
 * 
 * The distance is computed by:
 * 1. Sorting both input lists in ascending order.
 * 2. Taking the absolute difference between corresponding elements.
 * 3. Summing up all the differences.
 * 
 * Assumes both lists are of the same length.
 * 
 * @param {number[]} list1 - The first list of numbers.
 * @param {number[]} list2 - The second list of numbers.
 * 
 * @returns {number} The total distance between the two lists.
 * 
 * @example
 * calculateDistance([1, 3, 2], [4, 1, 5]); // returns 6
 */

export function calculateDistance(list1: number[], list2: number[]): number {
  const sortedList1 = [...list1].sort((a, b) => a - b);
  const sortedList2 = [...list2].sort((a, b) => a - b);

  return sortedList1.reduce((total, num, index) => {
    return total + Math.abs(num - sortedList2[index]);
  }, 0);
}
