function FlightsTable({ flights }) {
    return (

        <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Mission</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Mission Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Spacecraft</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Launch Date</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    flights.map(flight => {
                        return (
                            <tr key={flight._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{flight.mission}</td>
                                <td className="border border-gray-300 px-4 py-2">{flight.mission_type}</td>
                                <td className="border border-gray-300 px-4 py-2">{flight.spacecraft}</td>
                                <td className="border border-gray-300 px-4 py-2">{flight.launch_date}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                                    <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                                    <button className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default FlightsTable;