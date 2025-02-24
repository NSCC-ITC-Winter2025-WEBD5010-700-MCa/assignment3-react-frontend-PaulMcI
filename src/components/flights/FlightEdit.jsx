import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function FlightEdit() {

    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { isPending, error, data } = useQuery({
        queryKey: ["flight", id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3456/flights/${id}`);
            // console.log( response.json());
            return response.json();
        }
    });

    useEffect(() => {
        console.log(data);
        if (data) {
            // pre-populate the form with the data
            setValue('mission', data.mission);
            setValue('mission_type', data.mission_type);
            setValue('spacecraft', data.spacecraft);
            setValue('launch_date', data.launch_date);
            setValue('orbits_completed', data.orbits_completed);
        }
    }, [data]);

    return (

        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Flight Mission: {data?.mission}</h2>
            <form className="space-y-4">
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
                    Submit Flight Edits
                </button>
            </form>
        </div>

    );
}

export default FlightEdit;