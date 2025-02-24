import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function FlightCreate() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const collectData = (data) => {

        console.log(data);
        createFlightMutation.mutate(data);
    }    

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

        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Flight</h2>
            <form onSubmit={handleSubmit(collectData)} className="space-y-4">
                <div>
                    <input
                        {...register('mission', { required: 'Mission is required!' })}
                        type="text"
                        placeholder="Mission"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.mission && <p className="text-red-500 text-sm mt-1">{errors.mission.message}</p>}
                </div>
                <div>
                    <input
                        {...register('mission_type', { required: 'Mission Type is required!' })}
                        type="text"
                        placeholder="Mission Type"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.mission_type && <p className="text-red-500 text-sm mt-1">{errors.mission_type.message}</p>}
                </div>
                <div>
                    <input
                        {...register('spacecraft', { required: 'Spacecraft is required!' })}
                        type="text"
                        placeholder="Spacecraft"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.spacecraft && <p className="text-red-500 text-sm mt-1">{errors.spacecraft.message}</p>}
                </div>
                <div>
                    <input
                        {...register('launch_date', { required: 'Launch Date is required!' })}
                        type="text"
                        placeholder="Launch Date"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.launch_date && <p className="text-red-500 text-sm mt-1">{errors.launch_date.message}</p>}
                </div>
                <div>
                    <input
                        {...register('orbits_completed', { required: 'Orbits Completed is required!', min: { value: 0, message: 'Orbits Completed must equal to or greater than 0' } })}
                        type="number"
                        placeholder="Orbits Completed"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.orbits_completed && <p className="text-red-500 text-sm mt-1">{errors.orbits_completed.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
                    Create Flight
                </button>
            </form>
        </div>

    )
}

export default FlightCreate;