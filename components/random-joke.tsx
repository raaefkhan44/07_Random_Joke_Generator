"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface JokeResponse {
  setup: string;
  punchline: string;
}

export default function RandomJoke() {
  const [joke, setJoke] = useState<string>("");

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke(): Promise<void> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ff7f50] to-[#ff1493] p-4">
      <div className="bg-[#fffacd] rounded-2xl shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 text-[#ff4500] transition-colors duration-300">
          Random Jokes 🤪 😂
        </h1>
        <div className="bg-[#c092c2] rounded-lg p-6 mb-6 text-[#333] text-lg transform transition-transform duration-500 hover:scale-105">
          {joke || "Loading..."}
        </div>
        <Button
          onClick={fetchJoke}
          className="bg-[#32cd32] hover:bg-[#28a745] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 transform hover:scale-105"
        >
          Get New Joke 😂
        </Button>
      </div>
    </div>
  );
}