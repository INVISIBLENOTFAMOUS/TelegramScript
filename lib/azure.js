async function chatWithGPT(input) {
  const fetch = require("node-fetch")
  const messages = [
    {
      role: "system",
      content: "Anda adalah asisten yang membantu.",
    },
    {
      role: "user",
      content: input,
    },
  ];
  const response = await fetch(
    "https://oai-4.openai.azure.com/openai/deployments/complete-4/chat/completions?api-version=2023-07-01-preview",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "2e6532692d764b48b5454f0f4abf8c81",
      },
      body: JSON.stringify({
        messages,
      }),
    },
  );
  const data = await response.json();
  return data;
}

module.exports = { chatWithGPT }