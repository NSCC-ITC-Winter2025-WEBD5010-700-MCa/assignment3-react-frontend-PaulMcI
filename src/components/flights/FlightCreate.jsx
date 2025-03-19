// import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FlightForm from "./FlightForm";

function FlightCreate() {

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createFlightMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_FLIGHTS_API_URL}`, {
            //const response = await fetch("http://localhost:3456/flights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["flightsData"]);
            navigate("/admin/flights");
        },
    });

    const processData = (data) => {
        console.log(data);
        createFlightMutation.mutate(data);
    }

    return (

        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Flight</h2>
            <FlightForm onDataCollected={processData} />
        </div>

    )
}

export default FlightCreate;