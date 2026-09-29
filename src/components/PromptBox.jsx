import { useState } from "react";

function PromptBox({ onSend }) {
  const [prompt, setPrompt] = useState("");

  function handleSend() {
    if (prompt.trim() === "") {
      return;
    }

    onSend(prompt);
    setPrompt("");
  }

  return (
    <div className="prompt-box">
      <textarea
        placeholder="Ask something to compare across AI models..."
        rows="4"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default PromptBox;