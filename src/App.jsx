import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PromptBox from "./components/PromptBox";
import ModelCard from "./components/ModelCard";

function App() {
  const [userPrompt, setUserPrompt] = useState("");

  function handlePrompt(prompt) {
    setUserPrompt(prompt);
    console.log("User prompt:", prompt);
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
              response={userPrompt || "Waiting for your prompt..."}
              loading={false}
              error={null}
            />

            <ModelCard
              name="Llama"
              provider="Groq"
              response={userPrompt || "Waiting for your prompt..."}
              loading={false}
              error={null}
            />

            <ModelCard
              name="Qwen"
              provider="OpenRouter"
              response={userPrompt || "Waiting for your prompt..."}
              loading={false}
              error={null}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;