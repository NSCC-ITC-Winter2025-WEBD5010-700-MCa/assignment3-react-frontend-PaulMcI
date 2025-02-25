import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import BookForm from "./BookForm";

function BookEdit() {

  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await fetch(`${ import.meta.env.VITE_BOOKS_API_URL }/${id}`);
      // console.log( response.json());
      return response.json();
    }
  });

  const editBookMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${ import.meta.env.VITE_BOOKS_API_URL }/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["booksData"]);
      navigate("/admin/books");
    }
  });

  // monitor the data and update the form
  // useEffect reacts to a particular state change and runs a function
  // useEffects run on render and every update
  useEffect(() => {
    console.log(data);
    if (data) {
      // // pre-populate the form with the data
      // setValue('title', data.title);
      // setValue('author', data.author);
      // setValue('published_year', data.published_year);
      // setValue('genre', data.genre);
    }
  }, [data]);

  const processData = (data) => {
    editBookMutation.mutate(data)
  }

  // https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Book - Id: {data?.id}</h2>
      <BookForm onDataCollected={processData} initialDate={data} />
    </div>
  );
}

export default BookEdit;