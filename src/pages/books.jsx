import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import BooksTable from '../components/books/BooksTable';
import { Outlet, useLocation } from 'react-router-dom';

//  https://tanstack.com/query/v4/docs/framework/react/reference/useMutation

const Books = () => {

    // get the current location information
    const location = useLocation()

    console.log(location.pathname);

    const { isPending, error, data: books } = useQuery({
        queryKey: ["booksData"],
        queryFn: async () => {
            console.log("Fetching data");
            const response = await fetch("http://localhost:3000/books");
            return response.json(); // returns a promise of our data
        },
        staleTime: Infinity
    });

    if (error) return <div>{`An error has occurred: ${error.message}`}</div>

    return (
        <div>
            <h1 className="text-2xl font-bold">Books</h1>
            {
                location.pathname === "/admin/books" ?
                    isPending ? <div>Loading...</div> : <BooksTable books={books}></BooksTable>
                    :
                    <Outlet />
            }
        </div>
    );
};

export default Books;


