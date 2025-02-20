import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function FlightCreate() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createFlightMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch("http://localhost:3456/flights", {
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


    return (
        <div>
            <h2>Create New Flight</h2>
            <form onSubmit={handleSubmit(createFlightMutation.mutate)}>
                <input {...register("mission", { required: "mission is required!" })} type="text" placeholder="Mission"></input><br />
                <input {...register("mission_type", { required: "Mission Type is required!" })} type="text" placeholder="Mission Type"></input><br />
                <input {...register("spacecraft", { required: "Spacecraft is required!" })} type="text" placeholder="Spacecraft"></input><br />
                <input {...register("launch_date", { required: "Launch Date is required!" })} type="text" placeholder="Launch Date"></input><br />
                <button type="submit">Create Flight</button>
            </form>
        </div>
    )
}

export default FlightCreate;