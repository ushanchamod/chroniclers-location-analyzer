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
