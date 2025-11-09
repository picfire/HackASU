"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

interface Post {
  id: number;
  author: string;
  title: string;
  category: string;
  replies: number;
  views: number;
  timestamp: string;
  preview: string;
}

const categories = [
  { id: "all", name: "All Topics", icon: "💬" },
  { id: "culture", name: "Culture Shock", icon: "🌍" },
  { id: "academics", name: "Academics", icon: "📚" },
  { id: "housing", name: "Housing", icon: "🏠" },
  { id: "visa", name: "Visa & Legal", icon: "📋" },
  { id: "social", name: "Social Life", icon: "🎉" },
  { id: "tips", name: "Tips & Advice", icon: "💡" },
];

const samplePosts: Post[] = [
  {
    id: 1,
    author: "Sarah Chen",
    title: "How to make friends in your first week at university?",
    category: "social",
    replies: 24,
    views: 156,
    timestamp: "2 hours ago",
    preview:
      "Moving to the UK for my masters and feeling nervous about making connections...",
  },
  {
    id: 2,
    author: "Mike Johnson",
    title: "Understanding German academic culture - grading system explained",
    category: "academics",
    replies: 18,
    views: 203,
    timestamp: "5 hours ago",
    preview:
      "Coming from the US, the German grading system is confusing. Here's what I learned...",
  },
  {
    id: 3,
    author: "Priya Patel",
    title: "Best neighborhoods for students in Toronto?",
    category: "housing",
    replies: 32,
    views: 445,
    timestamp: "1 day ago",
    preview:
      "Looking for affordable housing near UofT. What areas would you recommend?",
  },
  {
    id: 4,
    author: "Alex Kim",
    title: "Culture shock: Tipping etiquette in the US",
    category: "culture",
    replies: 56,
    views: 892,
    timestamp: "2 days ago",
    preview:
      "Never had to tip before, and I'm so confused about when and how much to tip...",
  },
  {
    id: 5,
    author: "Emma Wilson",
    title: "F-1 visa interview tips - what they actually ask",
    category: "visa",
    replies: 41,
    views: 634,
    timestamp: "3 days ago",
    preview:
      "Just passed my F-1 visa interview! Here are the questions I got asked...",
  },
  {
    id: 6,
    author: "James Liu",
    title: "Dealing with homesickness while abroad",
    category: "culture",
    replies: 67,
    views: 1024,
    timestamp: "4 days ago",
    preview: "Been here 3 months and really struggling. How do you all cope?",
  },
];

export default function ForumPage() {
  const { user, isSignedIn } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = samplePosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Community Forum 💬
          </h1>
          <p className="text-xl text-gray-700">
            Ask questions, share experiences, and connect with fellow
            international students
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
            {isSignedIn ? (
              <button className="bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition shadow-lg hover:shadow-xl">
                + New Post
              </button>
            ) : (
              <button className="bg-gray-300 text-gray-600 px-8 py-3 rounded-lg font-semibold cursor-not-allowed">
                Sign in to post
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-2xl text-gray-400">No posts found</p>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Category Badge */}
                    <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                      {categories.find((c) => c.id === post.category)?.icon}{" "}
                      {categories.find((c) => c.id === post.category)?.name}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition">
                      {post.title}
                    </h3>

                    {/* Preview */}
                    <p className="text-gray-600 mb-3">{post.preview}</p>

                    {/* Meta info */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {post.author}
                      </span>
                      <span>{post.timestamp}</span>
                      <span className="flex items-center gap-1">
                        💬 {post.replies} replies
                      </span>
                      <span className="flex items-center gap-1">
                        👁️ {post.views} views
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-gray-400 text-2xl">→</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">📝</div>
            <div className="text-3xl font-bold text-purple-600">1,247</div>
            <div className="text-gray-600">Total Discussions</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-purple-600">3,892</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold text-purple-600">876</div>
            <div className="text-gray-600">Solved Questions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
