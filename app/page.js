"use client";
import { useState } from "react";

export default function Home() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [result, setResult] = useState(null);

  let mediaRecorder;
  let chunks = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    chunks = [];
    mediaRecorder.ondataavailable = e => chunks.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(blob);
    };

    window.recorder = mediaRecorder;
  };

  const stopRecording = () => {
    window.recorder.stop();
  };

  const analyze = async () => {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main>
      <h1>🎤 Fraud & AI Voice Risk Analyzer</h1>

      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={analyze} disabled={!audioBlob}>Analyze</button>

      {result && (
        <div className="card">
          <p><b>Transcript:</b> {result.transcript}</p>
          <p><b>Fraud Risk:</b> {result.fraudRisk}</p>
          <p><b>Fraud Score:</b> {result.fraudScore}%</p>
          <p><b>AI Voice Probability:</b> {result.aiVoice}%</p>

          <ul>
            {result.reasons.map((r, i) => <li key={i}>⚠️ {r}</li>)}
          </ul>
        </div>
      )}
    </main>
  );
}
