// test-fetch.js (ES Module version)
import https from "node:https";

// Optionally create a custom HTTPS agent to bypass certificate issues (for testing only)
const agent = new https.Agent({ rejectUnauthorized: false });

const url = "https://smart-ape-agent.koyeb.app/api/chat";

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  },
  body: JSON.stringify({ input: "hello", conversation_id: 0 }),
  // Uncomment the line below to use the custom HTTPS agent for debugging certificate issues:
  // agent,
})
  .then((res) => {
    console.log("Status:", res.status);
    return res.text();
  })
  .then((text) => {
    console.log("Response:", text);
  })
  .catch((error) => {
    console.error("Fetch failed:", error);
  });
