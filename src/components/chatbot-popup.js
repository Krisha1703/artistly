"use client";

import { useState, useRef, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { motion } from "framer-motion";
import useUserStore  from "@/app/state/store"; 

export default function ChatbotPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { role } = useUserStore();

  // ==========================
  // 👋 INITIAL MESSAGE
  // ==========================
  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/chat");

      let data = { message: "Something went wrong" };

      try {
        data = await res.json();
      } catch (err) {
        console.error("Invalid JSON:", err);
      }

      setMessages([
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    };

    init();
  }, []);

  // ==========================
  // 🚀 SEND MESSAGE
  // ==========================
  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input; // store before clearing

    // ✅ Clear instantly (UX FIX)
    setInput("");

    const userMsg = { role: "user", content: currentInput };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      if (data.redirect) {
        window.open(data.redirect, "_blank", "noopener,noreferrer");
      }

      const botMsg = {
        role: "assistant",
        content: data.message,
        results: data.results,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <ChatIcon />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-0 right-0 h-[80vh] w-full sm:w-[400px] chatbot shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-purple-600 text-white flex justify-between items-center p-4">
          <h2 className="font-semibold">AI Assistant</h2>
          <button onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-120px)]">
          {messages.map((msg, i) => (
            <div key={i} className="space-y-2">
              
              {/* Message Bubble */}
              <div
                className={`p-3 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>

              {/* 🎯 IMPROVED ARTIST CARDS */}
              {msg.results && msg.results.length > 0 && (
                <div className="space-y-3">
                  {msg.results.map((artist, idx) => (
                    <div
                      key={idx}
                      className=" border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-purple-700 text-base">
                            {artist.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {artist.category} • {artist.location}
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 text-right">
                          ⭐ {artist.rating || "N/A"}
                          <br />
                          💰 {artist.feeRange}
                        </div>
                      </div>

                      {/* Description */}
                      {artist.why && (
                        <p className="text-sm text-gray-700 mt-2">
                          {artist.why}
                        </p>
                      )}

                      {/* CTA */}
                      <div className="mt-3 flex justify-center">
                        {role ? (
                          <Link
                            href={{
                              pathname: "/get-quote",
                              query: {
                                name: artist.name,
                                availability: JSON.stringify(
                                  artist.availability || []
                                ),
                                feeRange: artist.feeRange,
                                location: artist.location,
                                category: artist.category,
                              },
                            }}
                          >
                            <motion.p
                              whileHover={{ scale: 1.05 }}
                              className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold px-4 py-2 cursor-pointer rounded-lg shadow"
                            >
                              Get a Quote
                            </motion.p>
                          </Link>
                        ) : (
                          <p className="text-xs text-purple-700 font-medium">
                            Login to get quote
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-sm text-gray-500">Thinking...</div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Ask something..."
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}