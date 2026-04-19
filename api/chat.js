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
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: message || "Hello"
          }
        ]
      })
    });

    const data = await response.json();

    console.log("GROQ RAW:", data);

    // 🔥 FORCE RETURN RAW DATA FOR DEBUG
    return res.status(200).json({
      reply: JSON.stringify(data)
    });

  } catch (err) {
    return res.status(500).json({
      reply: "Server error: " + err.message
    });
  }
}
