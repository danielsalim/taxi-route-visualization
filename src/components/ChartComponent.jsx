import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const calculateMedian = (array) => {
  const sorted = [...array].sort((a, b) => a - b); // Sort the array in ascending order
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2 // For even length arrays, average the two middle values
    : sorted[middle]; // For odd length arrays, return the middle value
};

const ChartComponent = ({ tripsData }) => {
  // Extract the fare_amount and trip_distance values from tripsData
  const fareAmounts = tripsData.map((trip) => parseFloat(trip.fare_amount));
  const tripDistances = tripsData.map((trip) => parseFloat(trip.trip_distance));

  // Calculate the median fare amount and median trip distance
  const medianFare = calculateMedian(fareAmounts);
  const medianDistance = calculateMedian(tripDistances);

  // Get the length of tripsData
  const tripsDataLength = tripsData.length;

  // Data for the bar chart
  const chartData = [
    { name: 'Trips', value: tripsDataLength },
    { name: 'Median Fare', value: medianFare },
    { name: 'Median Dist', value: medianDistance },
  ];

  return (
    <div className="p-6">
      {/* Chart Section */}
      <div className="mt-6">
        <BarChart width={370} height={380} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartComponent;
