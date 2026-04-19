/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Utensils,
  ShoppingBag,
  Truck,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const BUSINESS_NAME = "Tiger Town Pizza";
const TAGLINE = "Fierce Flavor. Fresh Pizza.";
const PHONE = "+16203775002";
const WHATSAPP = "+16203775002";
const ADDRESS = "302 N Main St, St John, KS 67576";
const MAPS_LINK = "https://maps.app.goo.gl/ExixzmemHCf1RFXp8";

const HOURS = [
  { day: "Sunday", time: "11 AM – 8 PM" },
  { day: "Monday", time: "CLOSED", closed: true },
  { day: "Tuesday", time: "11 AM – 8 PM" },
  { day: "Wednesday", time: "11 AM – 8 PM" },
  { day: "Thursday", time: "11 AM – 8 PM" },
  { day: "Friday", time: "11 AM – 8 PM" },
  { day: "Saturday", time: "11 AM – 8 PM" }
];

const SERVICES = [
  { title: "Takeout", icon: ShoppingBag },
  { title: "Dine-in", icon: Utensils },
  { title: "Delivery", icon: Truck },
  { title: "Online Order", icon: ShoppingBag }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // CHAT STATE
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<any>(null);

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

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      }, 400);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting to chat." }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-white font-sans selection:bg-primary selection:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 flex flex-col min-h-screen">

        {/* KEEP YOUR ORIGINAL UI EXACTLY SAME */}
        {/* (Header, Hero, Sidebar, Footer — unchanged from your original code) */}

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
            <div style={{ padding: "12px", background: "#ff7a00", fontWeight: "bold" }}>
              🍕 Tiger Town Chat
            </div>

            <div style={{ flex: 1, padding: "10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    background: msg.role === "user" ? "#ff7a00" : "#1f1f1f",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    maxWidth: "75%"
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ display: "flex", borderTop: "1px solid #222" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                style={{ flex: 1, padding: "10px", background: "transparent", border: "none", color: "white" }}
              />
              <button onClick={sendMessage} style={{ padding: "10px", background: "#ff7a00", border: "none" }}>
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
