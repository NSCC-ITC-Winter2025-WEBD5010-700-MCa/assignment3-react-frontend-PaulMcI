import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
import FlightForm from "./FlightForm";

function FlightEdit() {

    const { id } = useParams();
    // const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery({
        queryKey: ["flight", id],
        queryFn: async () => {
            console.log("here is the id: " + id);
            //const response = await fetch(`http://localhost:3456/flights/${id}`);
            const response = await fetch(`${import.meta.env.VITE_FLIGHTS_API_URL}/${id}`);
            //console.log("here is the data: " + response.json());
            // return response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();  // Parse JSON only once
            console.log("here is the data: ", data);
            return data;
        }
    });

    const editFlightMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_FLIGHTS_API_URL}/${id}`, {
                //const response = await fetch(`http://localhost:3456/flights/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                 //body: JSON.stringify(data)
                body: JSON.stringify({
                    ...data,
                    orbits_completed: Number(data.orbits_completed),
                  }),               
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["flightsData"]);
            navigate("/admin/flights");
        }
    });

    useEffect(() => {
        console.log(data);
        // if (data) {
        //     // pre-populate the form with the data
        //     setValue('mission', data.mission);
        //     setValue('mission_type', data.mission_type);
        //     setValue('spacecraft', data.spacecraft);
        //     setValue('launch_date', data.launch_date);
        //     setValue('orbits_completed', data.orbits_completed);
        // }
    }, [data]);

    const processData = (data) => {
        editFlightMutation.mutate(data)
    }

    return (

        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Flight Mission: {data?.mission}</h2>
            <FlightForm onDataCollected={processData} initialData={data} />
        </div>
    );
}

export default FlightEdit;