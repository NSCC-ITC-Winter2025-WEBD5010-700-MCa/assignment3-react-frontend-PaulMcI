import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import FlightsTable from "../components/FlightsTable";

//  https://tanstack.com/query/v4/docs/framework/react/reference/useMutation

const Flights = () => {

    const { isPending, error, data: flights } = useQuery({
        queryKey: ["flightsData"],
        queryFn: async () => {
            console.log("Fetching data");
            const response = await fetch("http://localhost:3456/flights");
            return response.json(); // returns a promise of our data
        }
    });

    if (error) return <div>{`An error has occurred: ${error.message}`}</div>

    return (
        <div>
            <h1 className="text-2xl font-bold">Flights</h1>
            {
                isPending ?
                    <div>Loading...</div>
                    :
                    <FlightsTable flights={flights}></FlightsTable>
            }
        </div>
    );
  };
  
  export default Flights;
  