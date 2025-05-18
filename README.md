# 🧭 Chief Chronicler's Location Analyzer

**Chief Chronicler's Location Analyzer** is a React + TypeScript tool designed to assist Elvish Chroniclers in reconciling historical location records to track down the missing Chief Chronicler.

Users can upload a `.txt` file containing two columns of numeric location IDs, and the system will calculate the total "distance" between the two lists using a sorted absolute difference method.

---

## 📁 File Format

Your `.txt` file must follow this format:

- Each line contains **exactly two space-separated numbers**.
- There must be **at least two lines** in the file.

### ✅ Example
```
57643 17620
19062 47340
11105 16109
```

---

## 🧮 Distance Calculation Logic

1. Each list of numbers is extracted independently from the file.
2. Both lists are sorted in ascending order.
3. Corresponding elements (smallest with smallest, etc.) are paired.
4. The total distance is the **sum of absolute differences** for each pair:  
   `|a - b|`

### 🔍 Example

**List 1**: 1, 3, 3, 4  
**List 2**: 3, 3, 5, 9  

After sorting and pairing:
- 1 with 3 → `|1 - 3| = 2`
- 3 with 3 → `0`
- 3 with 5 → `2`
- 4 with 9 → `5`

**Total Distance** = 2 + 0 + 2 + 5 = **9**

---

## 🚀 Features

- 📊 **Distance analysis panel**:
- 🕘 **Recent files list**:
  - Metadata (name, upload date).
  - Quick stats and re-analysis.
  - Remove file option.
- 💾 **Persistent local history** using LocalStorage.
- 🎯 **Elegant UI** built with Tailwind CSS.

---

## 📦 Technologies Used

- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 🧠 LocalStorage API

---

## 📂 Project Structure

```
src/
├── App.tsx
├── global.d.ts
├── index.css
├── main.tsx
├── types.ts
│
├── assets/
│   └── react.svg
│
├── components/
│   ├── DistanceCalculator.tsx
│   ├── FileUpload.tsx
│   ├── index.ts
│   └── RecentFiles.tsx
│
├── utils/
    ├── calculateDistance.ts
    ├── index.ts
    ├── parseInputFile.ts
    └── validateInputFile.ts
```


---

## ⚠️ Validation Rules

A file will be rejected if:

- It is empty.
- Any line does not have **exactly 2 values**.
- Any value is **not a number**.
- File has **fewer than 2 valid lines**.

---

## 💡 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ushanchamod/chroniclers-location-analyzer.git
   cd chroniclers-location-analyzer
   ```
1. **Install and Run**:
   ```bash
   npm install
   npm run dev
   ```
