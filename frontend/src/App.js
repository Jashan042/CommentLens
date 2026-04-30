import { useState } from "react";
import SentimentChart from "./components/SentimentChart";
import InsightCard from "./components/InsightCard";
import "./App.css";
function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/analyze/?url=${url}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
  <div className="app-container">
    
    <div className="header">
      <h1>CommentLens</h1>
      <p>AI-powered YouTube comment insights</p>
    </div>

    <div className="input-section">
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>
    </div>

    {loading && <p style={{ textAlign: "center" }}>Analyzing...</p>}

    {data && (
      <>
        <div className="card-container">
          <div className="card">
            <h4>Total Comments</h4>
            <p>{data.total_comments}</p>
          </div>

          <div className="card">
            <h4>Overall Sentiment</h4>
            <p>{data.overall_sentiment}</p>
          </div>

          <div className="card">
            <h4>Positive</h4>
            <p>{data.sentiment_distribution.POSITIVE || 0}</p>
          </div>

          <div className="card">
            <h4>Negative</h4>
            <p>{data.sentiment_distribution.NEGATIVE || 0}</p>
          </div>
        </div>

        <div className="section">
          <h2>Sentiment Distribution</h2>
          <SentimentChart data={data.sentiment_distribution} />
        </div>

        <div className="section">
          <h2>Sample Comments</h2>
          <ul className="comment-list">
            {data.sample_comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </>
    )}
  </div>
);
}

export default App;