import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import FlightsTable from "../components/flights/FlightsTable";
import { Outlet, useLocation } from 'react-router-dom';

//  https://tanstack.com/query/v4/docs/framework/react/reference/useMutation

const Flights = () => {

    // get the current location information
    const location = useLocation();
    //console.log(location.pathname);

    const { isPending, error, data: flights } = useQuery({
        queryKey: ["flightsData"],
        queryFn: async () => {
            console.log("Fetching data");
            //const response = await fetch("http://localhost:3456/flights");
            const response = await fetch(`${import.meta.env.VITE_FLIGHTS_API_URL}`);
            return response.json(); // returns a promise of our data
        },
        staleTime: Infinity
    });

    if (error) return <div>{`An error has occurred: ${error.message}`}</div>

    return (
        <div>

            <h1 className="text-2xl font-bold">Flights</h1>
            {
                location.pathname === "/admin/flights" ?
                    isPending ? <div>Loading...</div> : <FlightsTable flights={flights}></FlightsTable>
                    :
                    <Outlet />
            }
        </div>
    );
};

export default Flights;
