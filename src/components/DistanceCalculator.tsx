// components/DistanceCalculator.tsx

import { calculateDistance } from "../utils";

interface DistanceCalculatorProps {
  data: { list1: number[]; list2: number[]; distance?: number };
}

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
