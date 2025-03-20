import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function FlightsTable({ flights }) {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteFlightMutation = useMutation({

        mutationFn: async (flightId) => {
            const response = await fetch(`${import.meta.env.VITE_FLIGHTS_API_URL}/${flightId}`, {
            //const response = await fetch(`http://localhost:3456/flights/${flightId}`, {
                method: "DELETE"
            });
            return response.json();
        },
        onSuccess: () => {
            // console.log("onSuccess Delete");
            queryClient.invalidateQueries(["flightsData"]);
        },
        onError: () => {
            //console.log(error);
            alert("Unable to delete");
        }
    });

    const handleDelete = (flightId) => {
        // send a delete request to our api to delete the selected record
        //  console.log(flightId);
        if (window.confirm(`Are you sure you wish to delete record:  ${flightId}`)) {
            deleteFlightMutation.mutate(flightId);
        }
    }

    return (
        <>
            <p><Link to="/admin/flights/create">Add New Flight</Link></p>
            <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Mission</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Mission Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Spacecraft</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Launch Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Orbits Completed</th>
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
                                    <td className="border border-gray-300 px-4 py-2">{flight.orbits_completed}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                                        <button onClick={ () => navigate(`/admin/flights/${flight._id}/details`) } className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>                                        
                                        <button onClick={ () => navigate(`/admin/flights/${flight._id}/edit`) } className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                                        <button onClick={() => (handleDelete(flight._id))} className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default FlightsTable;