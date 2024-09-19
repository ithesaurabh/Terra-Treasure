import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import {OAuth} from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({}); // Initialize formData state as an empty object
  const { loading, error } = useSelector((state) => state.user); // Destructure loading and error state from user state
  const navigate = useNavigate(false); 
  const dispatch = useDispatch(); // Initialize dispatch by calling useDispatch()
  // Define a function to handle changes in the form inputs
  const handleChange = (e) => {
    // Update formData state with the new value of the changed input
    // The input's id is used as the key, and the input's value as the value
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      dispatch(signInStart());  // Set loading state to true
      // Send a POST request to the /api/auth/signin endpoint
      // The body of the request is the stringified formData state
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Parse the response as JSON
      const data = await res.json();
      // Log the response data to the console
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Set error state to the error message
        return;
      }
      dispatch(signInSuccess(data)); // Set user state to the user object
      navigate('/'); // Navigate to the home page
    } catch (error) {
      dispatch(signInFailure(error.message)); // Set error state to the error message
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
