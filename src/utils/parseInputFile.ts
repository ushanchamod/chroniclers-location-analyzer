/**
 * Parses the content of a text file into two separate numeric lists.
 * 
 * The function expects the content to contain multiple lines, 
 * each with two numbers separated by whitespace (space or tab).
 * It splits the content by lines, extracts the two numbers from each line,
 * and populates two corresponding arrays: `list1` and `list2`.
 * 
 * Lines that are empty or do not contain valid numbers are skipped.
 * 
 * @param {string} content - The plain text content of the uploaded file.
 * 
 * @returns {{ list1: number[]; list2: number[] }} 
 * An object containing two arrays: 
 * - `list1`: Numbers from the first column.
 * - `list2`: Numbers from the second column.
 * 
 * @example
 * // Input file content:
 * // 10 20
 * // 30 40
 * //
 * // Returns: { list1: [10, 30], list2: [20, 40] }
 * const result = parseInputFile("10 20\n30 40");
 */

export function parseInputFile(content: string): {
  list1: number[];
  list2: number[];
} {
  const lines = content.split("\n");
  const list1: number[] = [];
  const list2: number[] = [];

  lines.forEach((line) => {
    if (!line.trim()) return;

    const [num1, num2] = line.split(/\s+/).map(Number);
    if (!isNaN(num1)) list1.push(num1);
    if (!isNaN(num2)) list2.push(num2);
  });

  return { list1, list2 };
}
