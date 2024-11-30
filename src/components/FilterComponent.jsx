const FilterComponent = ({ filters, setFilters }) => {
  const initValue = {
    fareMin: 2.5,
    fareMax: 103,
    distanceMin: 0,
    distanceMax: 23.17,
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-6 px-4">
      {/* Filter by Time */}
      <div className="flex items-center justify-between mb-4 ">
        <span className="text-lg text-left font-semibold mr-3 w-30">
          Start Pickup Hour:
        </span>
        <input
          type="time"
          name="time"
          value={filters.time}
          onChange={handleChange}
          placeholder="Filter by time"
          className="w-1/3 p-2 border rounded-md text-black"
        />
      </div>

      {/* Filter by Fare Range */}
      <div className="flex items-center justify-between mb-4 ">
        <span className="text-lg text-left font-semibold mr-3 w-30">
          Fare Min: {filters.currFareMin} $
        </span>
        <input
          type="range"
          name="currFareMin"
          min={initValue.fareMin}
          max={filters.currFareMax}
          value={filters.currFareMin}
          step={0.5}
          onChange={handleChange}
          className="w-1/3 p-2 border rounded-md text-black"
        />
      </div>

      <div className="flex items-center justify-between mb-4 ">
        <span className="text-lg text-left font-semibold mr-3 w-30">
          Fare Max: {filters.currFareMax} $
        </span>
        <input
          type="range"
          name="currFareMax"
          min={filters.currFareMin}
          max={initValue.fareMax}
          value={filters.currFareMax}
          step={0.5}
          onChange={handleChange}
          className="w-1/3 p-2 border rounded-md text-black"
        />
      </div>

      {/* Filter by Distance Range */}
      <div className="flex items-center justify-between mb-4 ">
        <span className="text-lg text-left font-semibold mr-3 w-30">
          Distance Min: {filters.currDistanceMin} mile
        </span>
        <input
          type="range"
          name="currDistanceMin"
          min={initValue.distanceMin}
          max={filters.currDistanceMax}
          step={0.5}
          value={filters.currDistanceMin}
          onChange={handleChange}
          className="w-1/3 p-2 border rounded-md text-black"
        />
      </div>

      <div className="flex items-center justify-between mb-4 ">
        <span className="text-lg text-left font-semibold mr-3 w-30">
          Distance Max: {filters.currDistanceMax} mile
        </span>
        <input
          type="range"
          name="currDistanceMax"
          min={filters.currDistanceMin}
          max={initValue.distanceMax}
          step={0.5}
          value={filters.currDistanceMax}
          onChange={handleChange}
          className="w-1/3 p-2 border rounded-md text-black"
        />
      </div>

      {/* Filter by Payment Type */}
      <div className="flex items-center justify-between mb-4 ">
        <span className="text-lg text-left font-semibold mr-3 w-30">
          Payment Type:
        </span>
        <select
          name="paymentType"
          value={filters.paymentType}
          onChange={handleChange}
          className="w-1/3 p-2 border rounded-md text-black"
        >
          <option value="CRD">Credit Card</option>
          <option value="CSH">Cash</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
