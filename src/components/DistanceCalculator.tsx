import { calculateDistance } from "../utils";

interface DistanceCalculatorProps {
  data: { list1: number[]; list2: number[]; distance?: number };
}

/**
 * DistanceCalculator Component
 * 
 * Displays a summary of two numeric location lists and calculates the distance between them. 
 * Useful for visualizing the size of two datasets and the result of a distance calculation.
 * 
 * If a `distance` value is already provided in the `data` prop, it will be used directly.
 * Otherwise, the distance will be calculated dynamically using the `calculateDistance` utility.
 * 
 * @param {Object} props - Props for the component.
 * @param {{ list1: number[]; list2: number[]; distance?: number }} props.data 
 *   The input data for distance calculation and display.
 *   - `list1`: First array of numeric values.
 *   - `list2`: Second array of numeric values.
 *   - `distance` (optional): Pre-calculated distance value. If not provided, it will be computed.
 * 
 * @returns {JSX.Element} A styled card layout showing the number of locations in each list and the total distance.
 * 
 * @example
 * <DistanceCalculator 
 *   data={{ list1: [1, 2, 3], list2: [4, 5, 6] }} 
 * />
 */
const DistanceCalculator = ({ data }: DistanceCalculatorProps) => {
  const distance = data.distance || calculateDistance(data.list1, data.list2);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Location Lists Analysis
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
          <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-blue-500 truncate">
                  Locations in List 1
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {data.list1.length.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-green-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-green-500 truncate">
                  Locations in List 2
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {data.list2.length.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-center">
            <h3 className="text-lg font-medium text-indigo-600">
              Total Distance Between Lists
            </h3>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              {distance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DistanceCalculator };
