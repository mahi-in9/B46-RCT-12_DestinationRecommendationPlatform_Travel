import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../utills/firebase";
import { addDoc, collection } from "firebase/firestore";

function Survey() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    if (!user) {
      alert("Please log in to submit your preferences.");
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "preferences"), {
        ...data,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });
      navigate("/recommendations");
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Something went wrong while saving. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🧭 Tell us your travel preferences
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-semibold">Travel Interests:</label>
          <select
            {...register("interest", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select an interest</option>
            <option value="adventure">Adventure</option>
            <option value="culture">Culture</option>
            <option value="relaxation">Relaxation</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Budget (INR):</label>
          <input
            type="range"
            min="1000"
            max="200000"
            step="5000"
            className="w-full"
            {...register("budget", { required: true })}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Travel Style:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="solo"
                {...register("style", { required: true })}
              />{" "}
              Solo
            </label>
            <label>
              <input
                type="radio"
                value="family"
                {...register("style", { required: true })}
              />{" "}
              Family
            </label>
            <label>
              <input
                type="radio"
                value="luxury"
                {...register("style", { required: true })}
              />{" "}
              Luxury
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Get Recommendations
        </button>
      </form>
    </div>
  );
}

export default Survey;
