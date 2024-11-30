// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { fetchTrips } from '../services/api';
import ChartComponent from '../components/ChartComponent';
import FilterComponent from '../components/FilterComponent';
import MapComponent from '../components/MapComponent';

const Home = () => {
    const [tripsData, setTripsData] = useState([]);
    const [filters, setFilters] = useState({
        time: '09:00',
        currFareMin: 20,
        currFareMax: 25,
        currDistanceMin: 10,
        currDistanceMax: 12,
        paymentType: 'CSH',
    });
    const [appliedFilters, setAppliedFilters] = useState(filters);

    useEffect(() => {
        fetchTrips(filters).then(setTripsData).catch(console.error);
    }, [appliedFilters]);

    const applyFilters = () => {
        setAppliedFilters(filters);
    };
    console.log(tripsData)
    console.log(appliedFilters)
    return (
        <div className="flex h-screen font-sans text-white">
            <div className="w-1/5 h-full bg-slate-800 rounded-r-lg border-r-4 border-slate-400">
                <div className="flex-col group text-center pt-1 pb-20">
                    <p className="text-4xl p-4 font-semibold">Analytics Dashboard </p>
                    <p className="pr-1">Yellow Taxi Trip Data from New York City Taxi and Limousine Commission</p>
                </div>
                <div className='pb-20 text-center px-1'>
                    <p className="text-4xl p-4 pb-10 font-semibold ">Filter </p>
                    <FilterComponent filters={filters} setFilters={setFilters} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 mt-6 rounded"
                        onClick={applyFilters}
                    >
                        Apply Filter
                    </button>
                </div>
                {/* <div>
                    <p className="text-4xl text-center p-4 font-semibold pb-20">Selected Route Details </p>
                </div> */}
                <div className='bg-slate-800 rounded-3xl absolute left-0 bottom-0 z-10'>
                    <ChartComponent tripsData={tripsData} />
                </div>
            </div>

            <div className="absolute right-0 w-4/5 h-full">
                <MapComponent tripsData={tripsData} />
            </div>
        </div>
    );

};

export default Home;
