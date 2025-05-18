// utils/parseInputFile.ts
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
