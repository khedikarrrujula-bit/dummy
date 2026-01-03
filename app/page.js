"use client";
import { useState } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  const analyze = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcript })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main>
      <h1>🎤 Fraud & AI Voice Risk Analyzer</h1>

      <button onClick={startListening}>
        {listening ? "Listening..." : "🎙 Speak"}
      </button>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Your speech will appear here..."
      />

      <button onClick={analyze} disabled={!transcript}>
        Analyze
      </button>

      {result && (
        <div className="card">
          <p><b>Fraud Risk:</b> {result.fraudRisk}</p>
          <p><b>Fraud Score:</b> {result.fraudScore}%</p>
          <p><b>AI-Like Language:</b> {result.aiText}%</p>

          <ul>
            {result.reasons.map((r, i) => (
              <li key={i}>⚠️ {r}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
