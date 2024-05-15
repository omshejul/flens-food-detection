'use client'
import { useState } from "react";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Perform the API call here
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Failed to fetch response.');
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="prompt"
            className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
          >
            Prompt
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Hi"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          ></input>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            ></input>
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-200 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-300 hover:underline dark:text-blue-300"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          className="text-black bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

        <div className=" max-w-3xl">
          <p className=" text-sm font-light text-gray-100">
            {response}
          </p>
        </div>
    </div>
  );
};

export default Form;
