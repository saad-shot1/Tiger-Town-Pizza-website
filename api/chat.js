export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // 🔥 CHANGE THIS (IMPORTANT)
        messages: [
          {
            role: "system",
            content: "You are a helpful pizza shop assistant."
          },
          {
            role: "user",
            content: message || "Hello"
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 SHOW REAL ERROR IF ANY
    if (data.error) {
      console.error("GROQ ERROR:", data.error);
      return res.status(500).json({
        reply: "Groq Error: " + data.error.message
      });
    }

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({
      reply: "Server error: " + err.message
    });
  }
}
