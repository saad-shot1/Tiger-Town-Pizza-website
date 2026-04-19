export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Only POST allowed" });
    }

    const { message } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
        messages: [
          {
            role: "system",
            content: "You are a friendly pizza shop assistant. Help customers choose pizzas, suggest combos, and take orders."
          },
          {
            role: "user",
            content: message || "Hello"
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({
        reply: data.error.message
      });
    }

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      reply: "Server error: " + err.message
    });
  }
}
