import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../utills/firebase";
import { addDoc, collection } from "firebase/firestore";
import { fetchRecommendations } from "../apps/slices/destinationSlice";
import { useEffect } from "react";

function Survey() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      dispatch(fetchRecommendations(data));
      navigate("/recommendations", { state: { fromSurvey: true } });
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Something went wrong while saving. Please try again.");
    }
  };

  const budget = watch("budget", 5000);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
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
            <option value="beach">Beach</option>
            <option value="culture">Culture</option>
            <option value="history">History</option>
            <option value="nature">Nature</option>
            <option value="city">City</option>
            <option value="romance">Romance</option>
            <option value="wildlife">Wildlife</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Budget (INR): ₹{budget}
          </label>
          <input
            type="range"
            min="500"
            max="10000"
            step="100"
            className="w-full"
            {...register("budget", { required: true })}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Travel Style:</label>
          <div className="flex flex-wrap gap-4">
            {[
              "solo",
              "family",
              "luxury",
              "budget",
              "adventure",
              "relaxation",
            ].map((style) => (
              <label key={style} className="capitalize">
                <input
                  type="radio"
                  value={style}
                  {...register("style", { required: true })}
                  className="mr-1"
                />
                {style}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
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
