export default async function handler(req, res) {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Check API key
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const { message } = req.body;

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a friendly and smart assistant for Tiger Town Pizza. Help users with menu, deals, and orders."
          },
          {
            role: "user",
            content: message || "Hello"
          }
        ]
      })
    });

    const data = await response.json();

    // DEBUG (you can remove later)
    console.log("GROQ RESPONSE:", JSON.stringify(data, null, 2));

    // Safe parsing
    let reply = "Sorry, I couldn't respond.";

    if (data && data.choices && data.choices.length > 0) {
      reply =
        data.choices[0]?.message?.content ||
        data.choices[0]?.text ||
        reply;
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
