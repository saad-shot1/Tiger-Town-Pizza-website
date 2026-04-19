export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "user", content: message || "Hello" }
        ]
      })
    });

    cconst data = await response.json();

// DEBUG (VERY IMPORTANT)
console.log("GROQ RAW:", JSON.stringify(data, null, 2));

let reply = "No reply";

if (data.choices && data.choices.length > 0) {
  reply =
    data.choices[0]?.message?.content ||
    data.choices[0]?.text ||
    "No reply";
}

return new Response(JSON.stringify({ reply }), {
  status: 200,
  headers: { "Content-Type": "application/json" }
});
