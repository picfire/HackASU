"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ClaudeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your culture shock assistant. Ask me anything about adapting to a new country, university customs, social etiquette, or any cultural questions! 🌍",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get user context from localStorage
      const selectedCountry = localStorage.getItem("selectedCountry") || "";
      const selectedUniversity =
        localStorage.getItem("selectedUniversity") || "";

      const systemContext = selectedCountry
        ? `The user is planning to study at ${selectedUniversity} in ${selectedCountry}. Help them with culture shock, social customs, and adjustment tips specific to this context.`
        : "Help the user with general culture shock questions and international student concerns.";

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `${systemContext}\n\nUser question: ${input}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content[0].text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-2xl hover:bg-purple-600 transition-all duration-300 hover:scale-110 z-50 flex items-center gap-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="font-semibold">Ask Claude</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-2xl flex flex-col z-50 border-4 border-purple-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden">
                <img src="/claude.png" alt="Claude AI" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-black">Claude AI</h3>
                <p className="text-xs text-black opacity-90">
                  Culture Shock Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-purple-50 to-pink-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? "bg-purple-500 text-white"
                      : "bg-white text-gray-800 border-2 border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-purple-300 bg-gradient-to-br from-purple-100 to-pink-100 rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about culture, customs, tips..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  isLoading || !input.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
}
