import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FlightForm({ onDataCollected, initialData }) {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    //     defaultValues: initialData || {}
    // });


    // what is useEffect?       
    // useEffect is a hook that allows you to perform side effects in function components
    // useEffect runs after the first render and after every update 

    useEffect(() => {   // this only runs during initial renders of the form
        console.log('Use effect ran: ', initialData)
        if (initialData) {
            setValue('mission', initialData.mission);
            setValue('mission_type', initialData.mission_type);
            setValue('spacecraft', initialData.spacecraft);
            setValue('launch_date', initialData.launch_date);
            setValue('orbits_completed', initialData.orbits_completed);            
        }
    }, [initialData]);

    return (
            <form onSubmit={handleSubmit(onDataCollected)} className="space-y-4">
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
                    Submit Flight
                </button>
            </form>
    )
}