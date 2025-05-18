/**
 * Validates and parses the content of a text file containing two columns of integer values.
 * 
 * This function performs the following checks:
 * - Ensures the file is not empty.
 * - Verifies that each non-empty line contains exactly two values separated by whitespace.
 * - Confirms both values are valid integers.
 * - Requires at least two lines of valid data.
 * 
 * If validation passes, it returns `isValid: true` along with the parsed data (`list1` and `list2`).
 * Otherwise, it returns `isValid: false` with a descriptive error message.
 * 
 * @param {string} content - The plain text content of the file to validate and parse.
 * 
 * @returns {{
 *   isValid: boolean;
 *   error?: string;
 *   parsedData?: { list1: number[]; list2: number[] };
 * }} 
 * - `isValid`: Whether the file passed validation.
 * - `error`: A human-readable message explaining why validation failed (if applicable).
 * - `parsedData`: The extracted numeric lists (only present if validation succeeds).
 * 
 * @example
 * const result = validateInputFile("1 2\n3 4");
 * // result = {
 * //   isValid: true,
 * //   parsedData: { list1: [1, 3], list2: [2, 4] }
 * // }
 * 
 * @example
 * const result = validateInputFile("1 two");
 * // result = {
 * //   isValid: false,
 * //   error: "Invalid numbers on line 1: Both values must be numbers"
 * // }
 */

export const validateInputFile = (
  content: string,
): {
  isValid: boolean;
  error?: string;
  parsedData?: { list1: number[]; list2: number[] };
} => {
  if (!content.trim()) {
    return { isValid: false, error: "File is empty" };
  }

  const lines = content.split("\n").filter((line) => line.trim() !== "");
  const list1: number[] = [];
  const list2: number[] = [];

  for (const [i, line] of lines.entries()) {
    const parts = line.trim().split(/\s+/);

    if (parts.length !== 2) {
      return {
        isValid: false,
        error: `Invalid format on line ${i + 1}: Expected 2 numbers separated by whitespace`,
      };
    }

    const num1 = Number(parts[0]);
    const num2 = Number(parts[1]);

    if (isNaN(num1) || isNaN(num2)) {
      return {
        isValid: false,
        error: `Invalid numbers on line ${i + 1}: Both values must be numbers`,
      };
    }

    if (!Number.isInteger(num1) || !Number.isInteger(num2)) {
      return {
        isValid: false,
        error: `Only integer values allowed on line ${i + 1}`,
      };
    }

    list1.push(num1);
    list2.push(num2);
  }

  if (list1.length < 2) {
    return {
      isValid: false,
      error: "File must contain at least 2 rows of data",
    };
  }

  return {
    isValid: true,
    parsedData: { list1, list2 },
  };
};
