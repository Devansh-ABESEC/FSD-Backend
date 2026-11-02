import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:5000/api/test");
  const [requestBody, setRequestBody] = useState(
    '{\n  "message": "Hello Server",\n  "status": "testing"\n}',
  );
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseBody, setResponseBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResponseBody("");
    setResponseStatus(null);

    try {
      let data;
      if (method === "POST" && requestBody.trim()) {
        data = JSON.parse(requestBody);
      }

      const res = await axios({ method, url, data });

      setResponseStatus({
        code: res.status,
        text: res.statusText || "OK",
        isSuccess: true,
      });
      setResponseBody(JSON.stringify(res.data, null, 2));
    } catch (err) {
      if (err.response) {
        setResponseStatus({
          code: err.response.status,
          text: err.response.statusText || "Error",
          isSuccess: false,
        });
        setResponseBody(JSON.stringify(err.response.data, null, 2));
      } else {
        setResponseStatus({ code: "ERR", text: err.message, isSuccess: false });
        setResponseBody(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="badge">Assignment 4</div>
        <h1>API Tester</h1>
        <p className="subtitle">
          Interactive API client for GET & POST requests
        </p>
      </header>

      <main className="card">
        <div className="request-bar">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className={`method-dropdown ${method.toLowerCase()}`}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>

          <input
            type="text"
            className="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://localhost:5000/api/test"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="send-button"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>

        {method === "POST" && (
          <div className="section">
            <div className="section-header">
              <label htmlFor="req-body">Request Body (JSON)</label>
              <span className="info-tag">application/json</span>
            </div>
            <textarea
              id="req-body"
              rows={5}
              className="code-textarea"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              spellCheck="false"
            />
          </div>
        )}

        <div className="section">
          <div className="section-header">
            <label htmlFor="res-body">Response</label>
            {responseStatus && (
              <div
                className={`status-pill ${responseStatus.isSuccess ? "success" : "error"}`}
              >
                Status: {responseStatus.code} {responseStatus.text}
              </div>
            )}
          </div>
          <textarea
            id="res-body"
            readOnly
            rows={9}
            className="code-textarea response-textarea"
            value={responseBody}
            placeholder="Response will appear here after clicking 'Send'..."
            spellCheck="false"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
