import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserRoles from '../pages/UserRoles';
import UserManagement from '../pages/UserManagement';
import Dashboard from '../pages/Dashboard';
import AutoResponse from '../pages/AutoResponse';
import Customers from '../pages/Customers';
import Subscriptions from '../pages/Subscriptions';
import Books from '../pages/books';
import Flights from '../pages/Flights';
import BookCreate from '../components/books/BookCreate';
import BookEdit from '../components/books/BookEdit';
import FlightCreate from '../components/flights/FlightCreate';
import FlightEdit from '../components/flights/FlightEdit';
import FlightDetails from '../components/flights/FlightDetails';


// react router maps locations in browser to displays of components
// swapping in and out components

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: 'user-roles',
        element: <UserRoles />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
        path: 'auto-response',
        element: <AutoResponse />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'subscriptions',
        element: <Subscriptions />,
      },
      {
        path: 'books',
        element: <Books />,
        children: [
          {
            path: "create",
            element: <BookCreate />
          },
          {
            path: ":id/edit",
            element: <BookEdit />
          }
        ]
      },      
      {
        path: 'flights',
        element: <Flights />,
        children: [
          {
            path: "create",
            element: <FlightCreate />
          },
          {
            path: ":id/edit",
            element: <FlightEdit />
          },
          {
            path: ":id/details",
            element: <FlightDetails />
          }                      
        ]        
      },        
    ],
  },
]);

export default router;
