import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PromptBox from "./components/PromptBox";
import ModelCard from "./components/ModelCard";

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePrompt(prompt) {
    setUserPrompt(prompt);
    setGeminiResponse("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setGeminiResponse(data.response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <section className="welcome-section">
            <h1>Compare AI Models</h1>

            <p>
              Send one prompt to multiple AI models and compare
              their responses side by side.
            </p>
          </section>

          <PromptBox onSend={handlePrompt} />

          <section className="models-container">
            <ModelCard
              name="Gemini"
              provider="Google"
              response={geminiResponse}
              loading={loading}
              error={error}
            />

            {/*
            <ModelCard
              name="Llama"
              provider="Groq"
              response=""
              loading={false}
              error={null}
            />

            <ModelCard
              name="Qwen"
              provider="OpenRouter"
              response=""
              loading={false}
              error={null}
            />
            */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;