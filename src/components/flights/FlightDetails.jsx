//import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
//import { useForm } from "react-hook-form";

function FlightDetails() {

    const { id } = useParams();
    //const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { isPending, error, data } = useQuery({
        queryKey: ["flight", id],
        queryFn: async () => {
            //const response = await fetch(`http://localhost:3456/flights/${id}`);
            const response = await fetch(`${import.meta.env.VITE_FLIGHTS_API_URL}/${id}`);
            // console.log( response.json());
            return response.json();
        }
    });

    // useEffect(() => {
    //     console.log(data);
    //     if (data) {
    //         // pre-populate the form with the data
    //         setValue('mission', data.mission);
    //         setValue('mission_type', data.mission_type);
    //         setValue('spacecraft', data.spacecraft);
    //         setValue('launch_date', data.launch_date);
    //         setValue('orbits_completed', data.orbits_completed);
    //     }
    // }, [data]);

    return (

        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Flight Mission: {data?.mission}</h2>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Mission Type: {data?.mission_type}</h3>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Spacecraft: {data?.spacecraft}</h3>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Launch Date: {data?.launch_date}</h3>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Orbits Completed: {data?.orbits_completed}</h3>
        </div>

    );
}

export default FlightDetails;