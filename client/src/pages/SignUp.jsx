import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { OAuth } from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({}); // Initialize formData state as an empty object
  const [error, setError] = useState(null); // Initialize error state as null
  const [loading, setLoading] = useState(false); // Initialize loading state as false
  const navigate = useNavigate(false); 
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
    try {
      e.preventDefault(); // Prevent the default form submission behavior
      setLoading(true); // Set loading state to true
      // Send a POST request to the /api/auth/signup endpoint
      // The body of the request is the stringified formData state
      const res = await fetch("/api/auth/signup", {
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
        setLoading(false); // Set loading state to false
        setError(data.message); // Set error state to the error message returned by the API
        return;
      }
      setLoading(false);
      setError(null); // Set error state to null
      navigate('/sign-in'); // Navigate to the sign-in page
    } catch (error) {
      setLoading(false); 
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
