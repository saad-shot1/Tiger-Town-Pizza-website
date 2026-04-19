/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Phone,
  MapPin,
  Utensils,
  ShoppingBag,
  Truck,
  Menu,
  X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const BUSINESS_NAME = "Tiger Town Pizza";
const PHONE = "+16203775002";
const ADDRESS = "302 N Main St, St John, KS 67576";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // CHATBOT STATE
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<any>(null);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      // OPTIONAL: slight delay for better UX
      setTimeout(() => {
        const botMsg = { role: "bot", text: data.reply };
        setMessages((prev) => [...prev, botMsg]);
      }, 500);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting to chat." }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex justify-between items-center border-b border-border pb-6 mb-10">
          <div className="flex items-center gap-3">
            <img
              src="logo.png"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/50"
              alt="Logo"
            />
            <div className="text-2xl font-black uppercase text-primary">
              {BUSINESS_NAME}
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Hero */}
        <main className="flex flex-col justify-center py-10">
          <motion.img
            src="logo.png"
            className="w-32 h-32 rounded-full border mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          <h1 className="text-5xl font-black mb-4">
            Fierce Flavor. Fresh Pizza.
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            Premium, stone-baked pizzas with bold flavors.
          </p>

          <a
            href={`tel:${PHONE}`}
            className="bg-primary px-6 py-3 rounded-lg font-bold w-fit"
          >
            Order Now
          </a>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-10 border-t border-border text-sm">
          <p>{ADDRESS}</p>
          <p>{PHONE}</p>
        </footer>
      </div>

      {/* 💬 CHAT BUTTON */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#ff7a00",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          zIndex: 9999
        }}
      >
        💬
      </div>

      {/* 💬 CHAT BOX */}
      {isChatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "340px",
            height: "450px",
            background: "#0f0f0f",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "12px",
              background: "#ff7a00",
              color: "white",
              fontWeight: "bold"
            }}
          >
            🍕 Tiger Town Chat
          </div>

          {/* MESSAGES */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? "#ff7a00" : "#1f1f1f",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  maxWidth: "75%",
                  fontSize: "14px"
                }}
              >
                {msg.text}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div style={{ display: "flex", borderTop: "1px solid #222" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white"
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "10px 16px",
                background: "#ff7a00",
                border: "none",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
